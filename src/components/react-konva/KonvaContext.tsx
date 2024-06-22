import React, { createContext, useContext, useState, useCallback } from "react";
import { KonvaStructure, Layer, Group, KonvaObject } from "./types"; // Assume types are in a separate file
import Konva from "konva";
import { object } from "yup";

interface KonvaContextType {
  structure: KonvaStructure;
  addLayer: (layer: Layer) => void;
  addGroup: (parentId: string | null, group: Group) => void;
  addObject: (parentId: string | null, obj: KonvaObject) => void;
  updateObject: (id: string, transform: Konva.Transform) => void;
  moveLayer: (layerId: string, newIndex: number) => void;
  searchObjectById: (id: string) => KonvaObject | Group | null;
  undo: () => void;
  redo: () => void;
  selectObject: (node: Konva.Node) => void;
  deselectObject: (id: string) => void;
  clearSelectionObject: () => void;
  selectedObjects: Map<string, Konva.Node>;
  attachNode: (id: string, node: Konva.Node) => void;
}

const KonvaContext = createContext<KonvaContextType | undefined>(undefined);

export const KonvaProvider: React.FC<
  React.PropsWithChildren<{ initialStructure: KonvaStructure }>
> = ({ initialStructure, children }) => {
  const [structure, setStructure] = useState<KonvaStructure>(initialStructure);
  const [history, setHistory] = useState<KonvaStructure[]>([]);
  const [redoStack, setRedoStack] = useState<KonvaStructure[]>([]);
  const [selectedObjects, setSelectedObjects] = useState<
    Map<string, Konva.Node>
  >(new Map());
  const [nodeMap, setNodeMap] = useState<Map<string, Konva.Node>>(new Map());

  const saveHistory = useCallback(() => {
    setHistory((prev) => [structure, ...prev]);
    setRedoStack([]);
  }, [structure]);

  const addLayer = (layer: Layer) => {
    saveHistory();
    // Check for unique layer ID
    if (
      structure.layers.some((existingLayer) => existingLayer.id === layer.id)
    ) {
      console.warn(`Layer with ID ${layer.id} already exists. Skipping add.`);
      return;
    }
    setStructure((prev) => ({ ...prev, layers: [...prev.layers, layer] }));
  };

  const addGroup = (parentId: string | null, group: Group) => {
    saveHistory();
    const updatedLayers = structure.layers.map((layer) =>
      layer.id === (parentId ?? "")
        ? { ...layer, objects: [...layer.objects, group] }
        : layer
    );
    setStructure((prev) => ({ ...prev, layers: updatedLayers }));
  };

  const addObject = (parentId: string | null, obj: KonvaObject) => {
    saveHistory();
    let updatedLayers = structure.layers.map((layer) =>
      layer.id === (parentId ?? "")
        ? { ...layer, objects: [...layer.objects, obj] }
        : layer
    );

    // Check if the parent layer exists
    const parentLayerExists = structure.layers.some(
      (layer) => layer.id === parentId
    );

    // If parent layer does not exist, create a new layer with the object, ensuring unique ID
    if (!parentLayerExists) {
      const newLayerId = parentId ?? `layer-${Date.now()}`;
      if (structure.layers.some((layer) => layer.id === newLayerId)) {
        console.warn(
          `Layer with ID ${newLayerId} already exists. Skipping add.`
        );
        return;
      }
      const newLayer: Layer = {
        id: newLayerId,
        name: parentId ?? `Layer ${structure.layers.length + 1}`,
        objects: [obj],
      };
      updatedLayers = [...structure.layers, newLayer];
    }

    setStructure((prev) => ({ ...prev, layers: updatedLayers }));
  };

  const updateObject = (id: string, transform: Konva.Transform) => {
    saveHistory();
    const updatedLayers = structure.layers.map((layer) => ({
      ...layer,
      objects: layer.objects.map((obj) => {
        if (obj.id === id) {
          return { ...obj, transform: { ...obj.transform, ...transform } };
        }
        if ("objects" in obj) {
          return {
            ...obj,
            objects: obj.objects.map((subObj) =>
              subObj.id === id
                ? {
                    ...subObj,
                    transform: { ...subObj.transform, ...transform },
                  }
                : subObj
            ),
          };
        }
        return obj;
      }),
    }));
    setStructure((prev) => ({ ...prev, layers: updatedLayers }));
  };

  const moveLayer = (layerId: string, newIndex: number) => {
    saveHistory();
    const currentLayerIndex = structure.layers.findIndex(
      (layer) => layer.id === layerId
    );
    if (currentLayerIndex === -1) {
      console.warn(`Layer with ID ${layerId} does not exist.`);
      return;
    }

    const layerToMove = structure.layers[currentLayerIndex];
    const updatedLayers = [...structure.layers];
    updatedLayers.splice(currentLayerIndex, 1); // Remove the layer from its current position
    updatedLayers.splice(newIndex, 0, layerToMove); // Insert the layer at the new position

    setStructure((prev) => ({ ...prev, layers: updatedLayers }));
  };

  const searchObjectById = (id: string): KonvaObject | Group | null => {
    for (const layer of structure.layers) {
      for (const item of layer.objects) {
        if (item.id === id) {
          return item;
        }
        if ("objects" in item) {
          const found = item.objects.find((obj) => obj.id === id);
          if (found) return found;
        }
      }
    }
    return null;
  };

  const selectObject = (node: Konva.Node) => {
    setSelectedObjects((prev) => {
      let objects = new Map(prev);
      objects.set(`${node._id}`, node);
      return objects;
    });
  };

  const deselectObject = (id: string) => {
    setSelectedObjects((prev) => {
      let objects = new Map(prev);
      objects.delete(id);
      return objects;
    });
  };

  const clearSelectionObject = () => {
    setSelectedObjects((prev) => new Map());
  };

  const attachNode = (id: string, node: Konva.Node) => {
    setNodeMap((prev) => new Map(prev).set(id, node));
  };

  const undo = () => {
    if (history.length > 0) {
      const [lastState, ...rest] = history;
      setRedoStack((prev) => [structure, ...prev]);
      setStructure(lastState);
      setHistory(rest);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const [nextState, ...rest] = redoStack;
      setHistory((prev) => [structure, ...prev]);
      setStructure(nextState);
      setRedoStack(rest);
    }
  };

  return (
    <KonvaContext.Provider
      value={{
        structure,
        addLayer,
        addGroup,
        addObject,
        updateObject,
        moveLayer,
        searchObjectById,
        selectObject,
        deselectObject,
        selectedObjects,
        clearSelectionObject,
        attachNode,
        undo,
        redo,
      }}
    >
      {children}
    </KonvaContext.Provider>
  );
};

export const useKonvaContext = (): KonvaContextType => {
  const context = useContext(KonvaContext);
  if (!context) {
    throw new Error("useKonvaContext must be used within a KonvaProvider");
  }
  return context;
};

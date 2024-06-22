import React from "react";
import { Layer as KonvaLayer, KonvaNodeEvents } from "react-konva";
import { KonvaObject, Layer } from "./types"; // Assume types are in a separate file
import ObjectComponent from "./ObjectComponent"; // Assume ObjectComponent is in a separate file
import Konva from "konva";
import { object } from "yup";

interface LayerProps {
  layer: Layer;
  onChange?: (id: string, object: KonvaObject["transform"]) => void;
  onDragEnd?: KonvaNodeEvents["onDragEnd"];
  onTransformEnd?: KonvaNodeEvents["onTransformEnd"];
}

const LayerComponent: React.FC<React.PropsWithChildren<LayerProps>> = ({
  layer,
  children,
  onChange,
}) => {
  const refObject = React.useRef();

  const handleClick = (
    e: Konva.KonvaEventObject<Event>,
    object: KonvaObject
  ) => {
    // selectObject(e.currentTarget._id as any);
  };
  const handleTransformEnd = (
    e: Konva.KonvaEventObject<Event>,
    object: KonvaObject
  ) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    object.transform = {
      ...object.transform,
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
    };
    onChange?.(object.id, object.transform);
  };
  const handleDragEnd = (
    e: Konva.KonvaEventObject<MouseEvent>,
    object: KonvaObject
  ) => {
    object.transform = {
      ...object.transform,
      x: e.target.x(),
      y: e.target.y(),
    };
    onChange?.(object.id, object.transform);
  };

  return (
    <KonvaLayer>
      {layer.objects.map((item) => (
        <ObjectComponent
          ref={refObject}
          key={item.id}
          draggable={true}
          obj={item}
          onDragEnd={(e) => handleDragEnd(e, item as any)}
          onClick={(e) => handleClick(e, item as any)}
          onTap={(e) => handleClick(e, item as any)}
          onTransformEnd={(e) => handleTransformEnd(e, item as any)}
        />
      ))}
      {children}
    </KonvaLayer>
  );
};

export default LayerComponent;

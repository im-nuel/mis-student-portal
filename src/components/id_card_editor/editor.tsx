import {
  ActionIcon,
  AspectRatio,
  BackgroundImage,
  Box,
  Card,
  Group,
  Text,
} from "@mantine/core";
import { useFabricJSEditor } from "../react-fabric";
import {
  IconCirclePlus,
  IconCirclePlus2,
  IconFilePlus,
  IconLetterA,
  IconSquare,
  IconSquarePlus2,
  IconStackBackward,
  IconStackForward,
  IconTrash,
} from "@tabler/icons-react";
import { OptionsInput } from "./optionsInput";
import { useKonvaContext } from "../react-konva/KonvaContext";
import { IDCardEditor } from ".";
import { Stage, Transformer } from "react-konva";
import LayerComponent from "../react-konva/LayerComponent";
import { useResizeObserver } from "@mantine/hooks";
import { generateId } from "../utils/generateId";
import Konva from "konva";
import React from "react";

export const Editor = () => {
  const {
    structure,
    selectedObjects,
    selectObject,
    deselectObject,
    addObject,
    attachNode,
    clearSelectionObject,
    updateObject,
  } = useKonvaContext();

  const [refResizeObserver, rect] = useResizeObserver();
  const trRef = React.useRef<Konva.Transformer>();
  const stageRef = React.useRef<Konva.Stage>();

  React.useEffect(() => {
    console.log(selectedObjects, trRef);
    if (!trRef.current) return;
    if (selectedObjects.size > 0) {
      // we need to attach transformer manually
      const objects = Array.from(selectedObjects.values());
      trRef.current.nodes(objects);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedObjects]);

  return (
    <Box>
      <Card withBorder p="xs" bg={"#eee"}>
        <Group spacing={"xs"}>
          <ActionIcon
            variant="default"
            onClick={() => {
              addObject(null, {
                id: generateId(),
                type: "text",
                config: {
                  text: "COBA",
                  fill: "red",
                } as Konva.TextConfig,
                data: {},
                _node: undefined,
              });
            }}
          >
            <IconLetterA size={18} />
          </ActionIcon>
          <ActionIcon variant="default" onClick={() => {}}>
            <IconSquarePlus2 size={18} />
          </ActionIcon>
          <ActionIcon variant="default" onClick={() => {}}>
            <IconFilePlus size={18} />
          </ActionIcon>
          <ActionIcon variant="outline" color="red" onClick={() => {}}>
            <IconTrash size={18} />
          </ActionIcon>
          <ActionIcon variant="default" onClick={() => {}}>
            <IconStackForward size={18} />
          </ActionIcon>
          <ActionIcon variant="default" onClick={() => {}}>
            <IconStackBackward size={18} />
          </ActionIcon>
          {/* <OptionsInput canvas={canvas} /> */}
        </Group>
      </Card>
      <Card withBorder mt="md">
        <Card.Section bg={"#eee"}>
          <AspectRatio ratio={54 / 85.6}>
            <div ref={refResizeObserver}>
              <Stage
                ref={(ref) => (stageRef.current = ref as any)}
                width={rect.width}
                height={rect.height}
                onClick={(e) => {
                  if (e.target === e.target.getStage()) {
                    clearSelectionObject();
                  } else {
                    clearSelectionObject();
                    selectObject(e.target);
                  }
                }}
              >
                {structure.layers.map((layer) => (
                  <LayerComponent key={layer.id} layer={layer}>
                    {selectedObjects.size > 0 && (
                      <Transformer
                        ref={(ref) => (trRef.current = ref as any)}
                        flipEnabled={false}
                        boundBoxFunc={(oldBox, newBox) => {
                          // limit resize
                          if (
                            Math.abs(newBox.width) < 5 ||
                            Math.abs(newBox.height) < 5
                          ) {
                            return oldBox;
                          }
                          return newBox;
                        }}
                      />
                    )}
                  </LayerComponent>
                ))}
              </Stage>
            </div>
          </AspectRatio>
        </Card.Section>
      </Card>
    </Box>
  );
};

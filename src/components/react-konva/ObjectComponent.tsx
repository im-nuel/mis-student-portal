import React from "react";
import {
  Rect,
  Circle,
  Image,
  Text,
  Group as KonvaGroup,
  KonvaNodeEvents,
} from "react-konva";
import { KonvaObject, Group } from "./types"; // Assume types are in a separate file
import Konva from "konva";

interface ObjectProps {
  obj: KonvaObject | Group;
  draggable: boolean;
  onClick?: KonvaNodeEvents["onClick"];
  onTap?: KonvaNodeEvents["onTap"];
  onDragEnd?: KonvaNodeEvents["onDragEnd"];
  onTransformEnd?: KonvaNodeEvents["onTransformEnd"];
}

const ObjectComponent = React.forwardRef<any, ObjectProps>(
  ({ obj, draggable, ...events }, ref) => {
    if ("objects" in obj) {
      const { transform, objects } = obj as Group;
      return (
        <KonvaGroup {...transform}>
          {objects.map((item) => (
            <ObjectComponent
              ref={ref}
              key={item.id}
              obj={item}
              draggable={draggable}
              {...events}
            />
          ))}
        </KonvaGroup>
      );
    }

    const { type, config, transform } = obj as KonvaObject<Konva.ImageConfig>;
    const transformedConfig = { ...config, ...transform };

    switch (type) {
      case "rect":
        return (
          <Rect
            ref={ref}
            draggable={draggable}
            {...transformedConfig}
            {...events}
          />
        );
      case "circle":
        return (
          <Circle
            ref={ref}
            draggable={draggable}
            {...transformedConfig}
            {...events}
          />
        );
      case "image":
        return (
          <Image
            ref={ref}
            draggable={draggable}
            {...transformedConfig}
            {...events}
          />
        );
      case "text":
        return (
          <Text
            ref={ref}
            draggable={draggable}
            {...transformedConfig}
            {...events}
          />
        );
      default:
        return null;
    }
  }
);

export default ObjectComponent;

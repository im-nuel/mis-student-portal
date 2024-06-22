import { ActionIcon, Button, NumberInput } from "@mantine/core";
import { fabric } from "fabric";
import { TextOptions } from "fabric/fabric-impl";
import React from "react";

type TextOptionsConfigProps = {
  canvas: fabric.Canvas | null;
  object: fabric.Object;
};

export const TextOptionsConfig: React.FC<TextOptionsConfigProps> = ({
  canvas,
  object,
}) => {
  const raw = React.useMemo(() => object.toObject(), [object.toObject()]);
  return (
    <>
      <NumberInput
        size="sm"
        value={raw.fontSize}
        onChange={(value) => {
          object.setOptions({
            fontSize: value,
          });
        }}
      />
    </>
  );
};

import { fabric } from "fabric";
import React from "react";
import { TextOptionsConfig } from "./textOptions";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type OptionsInputProps = {
  canvas: fabric.Canvas | null;
};

export const OptionsInput: React.FC<OptionsInputProps> = ({ canvas }) => {
  const [objects, setObjects] = React.useState<fabric.Object[]>([]);
  const [opened, { toggle }] = useDisclosure(false);
  React.useEffect(() => {
    if (!canvas) return;
    const onObjectUpdated = () => {
      const objects = canvas.getActiveObjects();
      setObjects(objects);
    };
    canvas.on("selection:created", onObjectUpdated);
    canvas.on("selection:updated", onObjectUpdated);
    canvas.on("selection:cleared", onObjectUpdated);
    return () => {
      canvas.off("selection:created", onObjectUpdated);
      canvas.off("selection:updated", onObjectUpdated);
      canvas.off("selection:cleared", onObjectUpdated);
    };
  }, [canvas]);

  if (objects.length > 1 || objects.length === 0) {
    return null;
  }

  let SelectedConfig;

  switch (objects[0].type) {
    case "text":
      SelectedConfig = (
        <TextOptionsConfig canvas={canvas} object={objects[0]} />
      );
      break;
  }

  return (
    <>
      <Button
        size="xs"
        variant={opened ? "filled" : "default"}
        onClick={toggle}
      >
        Custom
      </Button>
      {opened && SelectedConfig}
    </>
  );
};

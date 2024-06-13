import { Button, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import _isEmpty from "lodash/isEmpty";
import React from "react";

export const DeveloperInspect: React.FC<{
  value: any;
}> = ({ value }) => {
  const [isOpen, { toggle }] = useDisclosure(true);

  if (_isEmpty(value)) return null;

  return (
    <div>
      <Button onClick={() => toggle()}>Inspect</Button>
      <Collapse in={isOpen}>{value}</Collapse>
    </div>
  );
};

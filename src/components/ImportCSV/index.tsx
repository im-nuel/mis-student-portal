import { Box, Button, Group, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Content, FieldProps } from "./Content";
import { FC } from "react";
import { Text } from "@mantine/core";

export const ImportCSV: FC<{
  fields: Omit<FieldProps, "pick">[];
  onSave: (data: { [key: string]: any }) => void;
}> = ({ fields, onSave }) => {
  const [opened, { open, close }] = useDisclosure(true);
  const [openedPromp, { open: openPrompt, close: closePrompt }] =
    useDisclosure(false);

  return (
    <>
      <Button onClick={() => open()}>Import CSV</Button>
      <Modal
        opened={opened}
        onClose={openPrompt}
        withCloseButton={false}
        size={"100%"}
        padding={0}
      >
        <Content
          fields={fields}
          onConfirm={function (data): void {
            onSave(data);
            close();
          }}
        />
      </Modal>

      <Modal
        title="Exit import flow"
        centered
        opened={openedPromp}
        onClose={closePrompt}
      >
        <Box>
          <Text>Are you sure you want to exit import flow?</Text>
        </Box>
        <Group mt="lg" position="right">
          <Button variant="outline" onClick={closePrompt}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              closePrompt();
              close();
            }}
          >
            Exit
          </Button>
        </Group>
      </Modal>
    </>
  );
};

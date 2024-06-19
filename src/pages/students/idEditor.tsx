import { Button, Modal } from "@mantine/core";
import { IDCardEditor } from "../../components/id_card_editor";
import { useDisclosure } from "@mantine/hooks";

export const IDEditor = () => {
  const [opened, { toggle }] = useDisclosure(true);
  return (
    <>
      <Button onClick={toggle}>ID Card</Button>
      <Modal
        title="ID Card Editor"
        opened={opened}
        onClose={function () {
          toggle();
        }}
      >
        <IDCardEditor />
      </Modal>
    </>
  );
};

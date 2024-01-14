import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Content } from "./Content";

export const ImportCSV = () => {
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <>
      <Button onClick={() => open()}>Import CSV</Button>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={"100%"}
        padding={0}
      >
        <Content
          fields={[
            {
              label: "Name",
              key: "name",
              example: "John Doe",
            },
            {
              label: "Email",
              key: "email",
              example: "johndoe@example.com",
            },
            {
              label: "Phone",
              key: "phone",
              example: "1234567890",
            },
            {
              label: "Address",
              key: "address",
              example: "123 Main St",
            },
            {
              label: "City",
              key: "city",
              example: "New York",
            },
            {
              label: "State",
              key: "state",
              example: "NY",
            },
            {
              label: "Zip",
              key: "zip",
              example: "12345",
            },
          ]}
          onConfirm={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Modal>
    </>
  );
};

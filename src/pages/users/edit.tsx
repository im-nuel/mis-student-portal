import { useForm } from "@refinedev/mantine";
import { Card, Container, NumberInput, Select, TextInput } from "@mantine/core";
import { Edit } from "../../components/page/Edit";
import { STUDENT_IMPORT_SCHEMA } from "../students/studentImportSchema";
import { CONSTANTS } from "../../components/constants";

export const UserEdit = () => {
  const { getInputProps, saveButtonProps } = useForm({
    initialValues: {
      email: "",
      role: "",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Container>
        <Card withBorder>
          <Edit.Header />
        </Card>
        <Card shadow="sm" withBorder mt="lg">
          <TextInput mt="sm" label="Email" {...getInputProps("email")} />
          <Select
            mt="sm"
            label="Role"
            withinPortal
            data={Object.values(CONSTANTS.USER_ROLE).map((v) => ({
              label: v,
              value: v,
            }))}
            {...getInputProps("role")}
          />
        </Card>

        <Card shadow="sm" withBorder mt="lg">
          <Edit.Footer />
        </Card>
      </Container>
    </Edit>
  );
};

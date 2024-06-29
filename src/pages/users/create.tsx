import { useForm } from "@refinedev/mantine";
import { Card, Select, TextInput } from "@mantine/core";
import { Create } from "../../components/page/Create";
import { CONSTANTS } from "../../components/constants";

export const UserCreate = () => {
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
  } = useForm({
    initialValues: { email: "", role: "", password: "" },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Card withBorder>
        <Create.Header />
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

        <TextInput mt="sm" label="Password" {...getInputProps("password")} />
      </Card>
      <Card shadow="sm" withBorder mt="lg">
        <Create.Footer />
      </Card>
    </Create>
  );
};

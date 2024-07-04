import { useLogin } from "@refinedev/core";
import { AuthPage } from "@refinedev/mantine";
import { useEffect } from "react";
import { ThemedTitleV2 } from "../../components/layout/title";

export const Login = () => {
  const { mutate: login } = useLogin();

  return (
    <AuthPage
      type="login"
      title={<ThemedTitleV2 text="My Title" collapsed={false} />}
      formProps={{
        initialValues: { email: "", password: "" },
      }}
    />
  );
};

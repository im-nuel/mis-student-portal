import { useLogin } from "@refinedev/core";
import { AuthPage } from "@refinedev/mantine";
import { useEffect } from "react";

export const Login = () => {
  const { mutate: login } = useLogin();

  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: { email: "", password: "" },
      }}
    />
  );
};

import React from "react";
import { LoadingOverlay } from "@mantine/core";
import { EditProps, SaveButtonProps } from "@refinedev/mantine";
import { EditPageProvider } from "./Edit/EditPageProvider";
import { EditHeader } from "./Edit/EditHeader";
import { EditFooter } from "./Edit/EditFooter";

export const Edit: React.FC<EditProps> & {
  Header: typeof EditHeader;
  Footer: typeof EditFooter;
} = (props) => {
  const {
    children,
    saveButtonProps: saveButtonPropsFromProps,
    isLoading,
  } = props;

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
  };

  const loadingOverlayVisible =
    isLoading ?? saveButtonPropsFromProps?.disabled ?? false;

  return (
    <EditPageProvider {...props}>
      <LoadingOverlay visible={loadingOverlayVisible} />
      {children}
    </EditPageProvider>
  );
};

Edit.Header = EditHeader;
Edit.Footer = EditFooter;

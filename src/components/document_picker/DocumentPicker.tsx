import { Modal, TextInput } from "@mantine/core";
import React from "react";
import {
  DocumentPickerContextProps,
  DocumentPickerProvider,
} from "./DocumentPickerProvider";
import { DocumentBrowser } from "./DocumentBrowser";

const Picker: React.FC<DocumentPickerContextProps> = (props) => {
  const { opened, onClose } = props;
  return (
    <Modal
      size={"lg"}
      opened={opened}
      onClose={() => onClose()}
      title="Select the document"
    >
      <DocumentPickerProvider {...props}>
        <DocumentBrowser folder={"/mis-portal/document-templates"} />
      </DocumentPickerProvider>
    </Modal>
  );
};

export const DocumentPicker: React.FC<{
  label: string;
  value: string;
  onSubmit: DocumentPickerContextProps["onSubmit"];
}> = ({ label, value, onSubmit }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TextInput
        onClick={() => setOpen(true)}
        label={label}
        readOnly
        value={value || ""}
      />
      <Picker
        value={value}
        folder={"/mis-portal/document-templates"}
        opened={open}
        onClose={() => setOpen(false)}
        onSubmit={(value, file) => {
          setOpen(false);
          onSubmit(value, file);
        }}
      />
    </>
  );
};

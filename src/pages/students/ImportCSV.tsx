import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUpload } from "@tabler/icons-react";
import { useCallback } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { studentImportSchema } from "./studentImportSchema";
import { useCreateMany } from "@refinedev/core";
import { Result } from "react-spreadsheet-import/types/types";

export const ImportCSV = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createStudents, overtime } = useCreateMany();

  const importCSVHandler = useCallback((data: Result<string>) => {
    console.log(data);
    createStudents({
      resource: "students",
      values: data.validData,
    });
  }, []);
  // console.log(overtime);

  return (
    <>
      <Button leftIcon={<IconUpload size={16} />} onClick={open}>
        Import CSV
      </Button>
      <ReactSpreadsheetImport
        autoMapSelectValues
        isNavigationEnabled
        isOpen={opened}
        onClose={close}
        onSubmit={importCSVHandler}
        fields={studentImportSchema}
      />
    </>
  );
};

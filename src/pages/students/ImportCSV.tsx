import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDownload, IconInfoCircle } from "@tabler/icons-react";
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

  return (
    <>
      <Button leftIcon={<IconDownload size={16} />} onClick={open}>
        Import CSV
      </Button>
      {opened && (
        <ReactSpreadsheetImport
          autoMapSelectValues
          isOpen={true}
          onClose={close}
          onSubmit={importCSVHandler}
          fields={studentImportSchema}
          uploadStepHook={async (data) => {
            return Promise.resolve(
              (data as string[][]).map((item) => {
                return item.map((col) => col.replace(/  |\r\n|\n|\r/gm, ""));
              })
            );
          }}
        />
      )}
    </>
  );
};

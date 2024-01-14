import { Box, Button, Stepper } from "@mantine/core";
import { FC, useState } from "react";
import { UploadPage } from "./UploadPage";
import { SelectionPage } from "./SelectionPage";
import { MatchColumnPage } from "./MatchColumnPage";
import { ValidationPage } from "./ValidationData";
import { processRows } from "./process";

export type FieldProps = {
  label: string;
  key: string;
  example: string;
  pick: string[];
};

export const Content: FC<{
  onConfirm: () => void;
  fields: Omit<FieldProps, "pick">[];
}> = ({ fields: defaultFields, onConfirm }) => {
  const [active, setActive] = useState(0);
  const [rows, setRows] = useState<string[][]>([]);
  const [headerIndex, setHeaderIndex] = useState(0);
  const [loading, setLoading] = useState(-1);
  const [fields, setFields] = useState(defaultFields);

  const [data, setData] = useState<{ [key: string]: any }[]>([]);

  return (
    <>
      <Box p="lg" bg={"gray.0"} sx={{ borderRadius: "8px 8px 0px 0px" }}>
        <Stepper active={active}>
          <Stepper.Step loading={loading === 0} label="Upload file" />
          <Stepper.Step loading={loading === 1} label="Select header row" />
          <Stepper.Step loading={loading === 2} label="Match Columns" />
          <Stepper.Step loading={loading === 3} label="Validate data" />
        </Stepper>
      </Box>
      {active === 0 && (
        <UploadPage
          onNext={(rows) => {
            setRows(rows);
            setActive(1);
            setLoading(-1);
          }}
          onBeforeProcessing={function (): void {
            setLoading(0);
          }}
        />
      )}
      {active === 1 && (
        <SelectionPage
          rows={rows}
          onNext={(selectedRow) => {
            setHeaderIndex(selectedRow);
            setActive(2);
          }}
        />
      )}
      {active === 2 && (
        <MatchColumnPage
          fields={fields}
          headerIndex={headerIndex}
          data={rows}
          onNext={(fieldPick) => {
            setData(processRows(rows, headerIndex, fieldPick));
            setActive(3);
          }}
        />
      )}
      {active === 3 && (
        <ValidationPage
          data={data}
          onConfirm={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </>
  );
};

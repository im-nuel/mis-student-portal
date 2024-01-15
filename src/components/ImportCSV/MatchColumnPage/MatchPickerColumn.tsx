import { Accordion, ActionIcon, Box, Flex, Select } from "@mantine/core";
import { FC, useMemo } from "react";
import { FieldProps } from "../Content";
import { IconCircle, IconCircleCheck } from "@tabler/icons-react";

export const MatchPickerColumn: FC<{
  fields: FieldProps[];
  fieldPick: {
    key: string;
    field: string | null;
  }[];
  column: {
    title: string;
    key: string;
    __index: string;
    ignored?: boolean;
  };
  columnWidth: number;
  onFieldPick: (key: string, field: string | null) => void;
}> = ({ column, columnWidth, fields, fieldPick, onFieldPick }) => {
  const relatedFieldPick = fieldPick.find((f) => f.key === column.key);
  const isIgnored = column.ignored;
  const isChecked = !!relatedFieldPick?.field;
  const isSelect =
    fields.find((f) => f.key === relatedFieldPick?.field)?.fieldType.type ===
    "select";
  return (
    <Flex
      key={column.title}
      sx={{ width: columnWidth, whiteSpace: "nowrap" }}
      direction={"column"}
      px={"xl"}
      py={"sm"}
    >
      {isIgnored ? (
        <Box>Column ignored</Box>
      ) : (
        <>
          <Flex align={"center"}>
            <Box>
              <Select
                searchable
                clearable
                allowDeselect
                withinPortal
                data={fields.map((field) => {
                  const selectedField = fieldPick.map((f) => f.field);
                  const currentField =
                    fieldPick[selectedField.indexOf(field.key)];
                  return {
                    label: field.label,
                    value: field.key,
                    disabled:
                      selectedField.indexOf(field.key) !== -1 &&
                      currentField?.field !== column.key,
                  };
                })}
                value={fieldPick.find((f) => f.key === column.key)?.field}
                onChange={(value) => {
                  onFieldPick(column.key, value);
                }}
              />
            </Box>
            <Box ml="md">
              <ActionIcon
                tabIndex={-1}
                radius="xl"
                sx={{
                  pointerEvents: "none",
                }}
              >
                {isChecked ? <IconCircleCheck color="green" /> : <IconCircle />}
              </ActionIcon>
            </Box>
          </Flex>
        </>
      )}
    </Flex>
  );
};

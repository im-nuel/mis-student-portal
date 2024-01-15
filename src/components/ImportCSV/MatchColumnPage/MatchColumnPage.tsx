import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Select,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCircle,
  IconCircleCheck,
  IconRestore,
  IconX,
} from "@tabler/icons-react";
import { FC, useMemo, useState } from "react";
import { FieldProps } from "../Content";
import { MatchPickerColumn } from "./MatchPickerColumn";

type FieldPick = {
  key: string;
  field: string | null;
};

export const MatchColumnPage: FC<{
  data: string[][];
  headerIndex: number;
  fields: FieldProps[];
  onNext: (fieldPick: FieldPick[]) => void;
}> = ({ headerIndex, data, fields: defaultFields, onNext }) => {
  const columns = useMemo(() => {
    return data[headerIndex].map((_, i) => {
      return {
        title: data[headerIndex][i],
        key: data[headerIndex][i],
        __index: `${i}`,
      };
    });
  }, [data, headerIndex]);
  const rows = useMemo<{ [key: string]: any }[]>(() => {
    return data.slice(1).map((col, __index) => {
      return col.reduce(
        (p, c, index) => {
          return { ...p, [columns[index].title]: c };
        },
        { __index }
      );
    });
  }, [data, headerIndex]);

  const [fieldPick, setFieldPick] = useState<FieldPick[]>(
    columns.map((column) => ({ key: column.key, field: null }))
  );

  const [ignoredFields, setIgnoredFields] = useState<{
    [key: string]: boolean;
  }>(columns.reduce((p, c) => ({ [c.key]: false }), {}));

  const columnWidth = 300;

  const theme = useMantineTheme();

  if (rows.length === 0) {
    return null;
  }

  return (
    <>
      <Box p="lg">
        <Title order={2} mb={"lg"}>
          Select header row
        </Title>
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <Title
            order={3}
            mb="md"
            sx={{
              position: "sticky",
              left: 0,
            }}
          >
            Your table
          </Title>
          <Box
            sx={{
              position: "relative",
              width: columnWidth * columns.length,
              border: `1px solid ${theme.colors.gray[2]}`,
              borderRadius: "24px 24px 0px 0px",
            }}
          >
            <Box
              sx={{
                pointerEvents: "none",
                position: "absolute",
                backgroundImage: `linear-gradient(to bottom, rgba(255,255,255, 0), rgba(255,255,255, 1))`,
                top: 0,
                bottom: -1,
                left: -1,
                right: -1,
              }}
            />
            <Flex>
              {columns.map((column) => (
                <Flex
                  key={column.key}
                  sx={{ width: columnWidth, whiteSpace: "nowrap" }}
                  px={"xl"}
                  py={"sm"}
                  align={"center"}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      color: ignoredFields[column.key] ? "gray" : "black",
                    }}
                  >
                    {column.title}
                  </Box>
                  <Box>
                    <ActionIcon
                      size="sm"
                      onClick={() => {
                        setIgnoredFields((fields) => {
                          return {
                            ...fields,
                            [column.key]: !fields[column.key],
                          };
                        });
                        !ignoredFields[column.key] &&
                          setFieldPick((fields) => {
                            return [
                              ...fields.map((field) => {
                                if (field.key === column.key)
                                  return {
                                    ...field,
                                    field: null,
                                  };
                                return field;
                              }),
                            ];
                          });
                      }}
                    >
                      {ignoredFields[column.key] ? <IconRestore /> : <IconX />}
                    </ActionIcon>
                  </Box>
                </Flex>
              ))}
            </Flex>
            {rows.slice(0, 2).map((row) => (
              <Flex key={row.__index}>
                {columns.map((column) => (
                  <Flex
                    key={`${row.__index}-${column.__index}`}
                    sx={{
                      width: columnWidth,
                    }}
                    px={"xl"}
                    py={"sm"}
                    align={"center"}
                  >
                    <Box
                      sx={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {row[column.key]}
                    </Box>
                  </Flex>
                ))}
              </Flex>
            ))}
          </Box>
          <Title
            order={3}
            mt="lg"
            mb="md"
            sx={{
              position: "sticky",
              left: 0,
            }}
          >
            Will become
          </Title>
          <Box
            sx={{
              position: "relative",
              width: columnWidth * columns.length,
              border: `1px solid ${theme.colors.gray[2]}`,
              borderRadius: "24px 24px 0px 0px",
            }}
          >
            <Box
              sx={{
                pointerEvents: "none",
                position: "absolute",
                backgroundImage: `linear-gradient(to bottom, rgba(255,255,255, 0), rgba(255,255,255, 1))`,
                top: 0,
                bottom: -1,
                left: -1,
                right: -1,
              }}
            />
            <Flex>
              {columns.map((column) => (
                <MatchPickerColumn
                  column={{
                    ...column,
                    ignored: ignoredFields[column.key],
                  }}
                  columnWidth={columnWidth}
                  fields={defaultFields}
                  fieldPick={fieldPick}
                  onFieldPick={(key, value) => {
                    console.log(key, value);
                    setFieldPick((fields) => {
                      return [
                        ...fields.map((field) => {
                          if (field.key === key) {
                            field.field = value as string;
                          }
                          return field;
                        }),
                      ];
                    });
                  }}
                />
              ))}
            </Flex>
            <Box sx={{ height: 100 }}></Box>
          </Box>
        </Box>
      </Box>
      <Box
        p={"lg"}
        bg={"gray.0"}
        sx={{ textAlign: "center", borderRadius: "0px 0px 8px 8px" }}
      >
        <Button
          disabled={fieldPick.filter((f) => f.field != null).length < 1}
          size="lg"
          w={"25%"}
          onClick={() => onNext(fieldPick)}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

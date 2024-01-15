import {
  Box,
  Button,
  Flex,
  Group,
  ScrollArea,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { IconFileTypeCsv, IconUpload, IconX } from "@tabler/icons-react";
import { FC, useCallback, useMemo, useState } from "react";
import Papa from "papaparse";
import { FieldProps } from "./Content";

export const UploadPage: FC<{
  fields: Omit<FieldProps, "pick">[];
  onBeforeProcessing: () => void;
  onNext: (rows: string[][]) => void;
}> = ({ fields, onBeforeProcessing, onNext }) => {
  const theme = useMantineTheme();
  const columns = useMemo(() => {
    return fields.map((field, i) => {
      return {
        title: field.label,
        key: field.key,
        example: field.example,
        __index: `${i}`,
      };
    });
  }, [fields]);

  const [loading, setLoading] = useState(false);

  const handleDrop = useCallback(async (files: FileWithPath[]) => {
    onBeforeProcessing();
    setLoading(true);
    await Papa.parse<string[]>(files[0] as any, {
      complete: function (results) {
        setLoading(false);
        onNext(results.data);
      },
    });
  }, []);

  const columnWidth = 150;

  return (
    <>
      <Box p="lg">
        <Title order={2} mb={"lg"}>
          Upload File
        </Title>
        <Title order={3}>Data that we expect:</Title>
        <Text size="sm" mb={"lg"} color="gray">
          (You will have a chance to rename or remove columns in next steps)
        </Text>
        <ScrollArea>
          <Box
            sx={{
              position: "relative",
              width: columnWidth * columns.length,
              border: `1px solid ${theme.colors.gray[2]}`,
              borderRadius: "24px 24px 0px 0px",
            }}
            pb="xl"
          >
            <Box
              sx={{
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
                <Box key={column.key} w={columnWidth} px={"sm"}>
                  <Flex align={"center"} py={"xs"}>
                    <Box
                      sx={{
                        flexGrow: 1,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        fontSize: 12,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      {column.title}
                    </Box>
                  </Flex>
                  <Box
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                    pb={"xs"}
                  >
                    {column.example}
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>
        </ScrollArea>
        <Box>
          <Dropzone
            loading={loading}
            onDrop={handleDrop}
            accept={["text/csv"]}
            maxFiles={1}
            size="lg"
            label="Drop files here or click to select"
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: 220, pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  size={50}
                  stroke={1.5}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size={50}
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconFileTypeCsv size={50} stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag csv file here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Box>
      </Box>
    </>
  );
};

import {
  Box,
  Button,
  Group,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { IconFileTypeCsv, IconUpload, IconX } from "@tabler/icons-react";
import { FC, useCallback, useState } from "react";
import Papa from "papaparse";

export const UploadPage: FC<{
  onBeforeProcessing: () => void;
  onNext: (rows: string[][]) => void;
}> = ({ onBeforeProcessing, onNext }) => {
  const theme = useMantineTheme();

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

  return (
    <>
      <Box p="lg">
        <Title order={2} mb={"lg"}>
          Upload File
        </Title>
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

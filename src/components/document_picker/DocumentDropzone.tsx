import { Group, Text } from "@mantine/core";
import { Flex, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { IconFileTypeDocx } from "@tabler/icons-react";
import { IconUpload, IconX } from "@tabler/icons-react";
import React from "react";
import { imagekit } from "../../provider/imagekit";
import { fileToBlob } from "../utils/fileToBlob";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { useDocumentPickerContext } from "./DocumentPickerProvider";

export const DocumentDropzone: React.FC<{
  onSubmit: (file: File) => void;
  onCompleted: (file: UploadResponse) => void;
}> = () => {
  const { setIsSubmitting, refetch } = useDocumentPickerContext();
  const theme = useMantineTheme();

  const imageUploadHandler = async (file: File) => {
    setIsSubmitting(true);
    const res = await imagekit.upload({
      file: (await fileToBlob(file)) as any,
      fileName: file.name,
      folder: "/mis-portal/document-templates",
    });
    await refetch();
    setIsSubmitting(false);
  };

  const handleDrop = React.useCallback(async (files: FileWithPath[]) => {
    const file = files[0];
    if (!file) return;
    imageUploadHandler(file);
  }, []);

  return (
    <Dropzone
      onDrop={handleDrop}
      accept={[
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]}
      maxFiles={1}
    >
      <Group
        position="center"
        style={{ minHeight: 220, pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size={50}
            stroke={1.5}
            color={theme.colors[theme.primaryColor][6]}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={50} stroke={1.5} color={theme.colors.red[6]} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFileTypeDocx size={50} stroke={1.5} />
        </Dropzone.Idle>
        <div>
          <Text size="xl" inline>
            Drag image file here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};

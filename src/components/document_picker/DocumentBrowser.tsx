import {
  ActionIcon,
  AspectRatio,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Loader,
  LoadingOverlay,
  Menu,
  Text,
} from "@mantine/core";
import React from "react";
import { useList } from "@refinedev/core";
import {
  IconCross,
  IconDots,
  IconDotsVertical,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useDocumentPickerContext } from "./DocumentPickerProvider";
import { DocumentDropzone } from "./DocumentDropzone";
import { UploadResponse } from "imagekit/dist/libs/interfaces";

export const DocumentBrowser: React.FC<{
  folder: string;
}> = ({ folder }) => {
  const {
    onSubmit,
    value,
    documents,
    documentsHandler,
    isFetching,
    isSubmitting,
    setIsSubmitting,
    refetch,
  } = useDocumentPickerContext();

  const [filter, setFilter] = React.useState({
    skip: 0,
    limit: 10,
    page: 1,
  });

  return (
    <div style={{ minHeight: 350, position: "relative" }}>
      <LoadingOverlay visible={isFetching} />
      <Grid columns={2}>
        {documents.map((file, idx) => (
          <Grid.Col key={file.fileId} span={1}>
            <Card
              shadow="sm"
              withBorder={true}
              p={0}
              style={{ position: "relative" }}
            >
              <AspectRatio ratio={1}>
                <Flex
                  direction="column"
                  style={{
                    position: "absolute",
                    inset: 0,
                    alignItems: "stretch",
                  }}
                >
                  <Flex style={{ flexShrink: 0 }} align={"center"}>
                    <Text truncate style={{ flexGrow: 1 }} pl={16} pr={8}>
                      {file.name}
                    </Text>
                    <Menu width={200}>
                      <Menu.Target>
                        <ActionIcon variant="subtle" size={"xl"}>
                          <IconDotsVertical />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          color="red"
                          icon={<IconTrash />}
                          onClick={async () => {
                            setIsSubmitting(true);
                            await documentsHandler.remove(file.fileId, idx);
                            await refetch();
                            setIsSubmitting(false);
                          }}
                        >
                          Remove
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Flex>
                  <Card.Section
                    style={{
                      flexGrow: 1,
                      position: "relative",
                      height: "100%",
                      minHeight: 1,
                      width: "100%",
                      backgroundColor: "#eee",
                    }}
                  >
                    <img
                      src={file.thumbnail}
                      alt={file.name}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Card.Section>
                  <Group p={8} grow>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => onSubmit(file.url, file)}
                    >
                      {file.url === value ? "Used" : "Use"}
                    </Button>
                  </Group>
                </Flex>
              </AspectRatio>
            </Card>
          </Grid.Col>
        ))}
        <Grid.Col span={1}>
          <Card
            // shadow="sm"
            // withBorder={true}
            p={0}
            style={{ position: "relative" }}
          >
            <AspectRatio ratio={1}>
              <LoadingOverlay visible={isSubmitting} />
              <DocumentDropzone
                onSubmit={(file) => {
                  setIsSubmitting(true);
                }}
                onCompleted={function (file: UploadResponse): void {
                  refetch();
                  setIsSubmitting(false);
                }}
              />
            </AspectRatio>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

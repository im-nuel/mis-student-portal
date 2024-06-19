import {
  ActionIcon,
  AspectRatio,
  BackgroundImage,
  Box,
  Card,
  Group,
  Text,
} from "@mantine/core";
import { useFabricJSEditor } from "../react-fabric";
import {
  IconCirclePlus,
  IconCirclePlus2,
  IconFilePlus,
  IconLetterA,
  IconSquare,
  IconSquarePlus2,
  IconTrash,
} from "@tabler/icons-react";

export const IDCardEditor = () => {
  const [connect, { canvas, action }] = useFabricJSEditor();
  return (
    <Box>
      <Card withBorder p="xs" bg={"#eee"}>
        <Group spacing={"xs"}>
          <ActionIcon
            variant="default"
            onClick={() => {
              action.addText({ text: "New Text" });
            }}
          >
            <IconLetterA size={18} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            onClick={() => {
              action.addCircle({});
            }}
          >
            <IconCirclePlus2 size={18} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            onClick={() => {
              action.addRectangle({});
            }}
          >
            <IconSquarePlus2 size={18} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            onClick={() => {
              action.addImage({ src: "https://placehold.co/100x100" });
            }}
          >
            <IconFilePlus size={18} />
          </ActionIcon>
          <ActionIcon
            variant="outline"
            color="red"
            onClick={() => {
              action.removeObject();
            }}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Card>
      <Card withBorder mt="md">
        <Card.Section bg={"#eee"}>
          <AspectRatio ratio={54 / 85.6}>
            <div>
              <Box
                component="canvas"
                ref={(el) => connect(el)}
                sx={{
                  position: "absolute",
                  inset: 0,
                }}
              />
            </div>
          </AspectRatio>
        </Card.Section>
      </Card>
    </Box>
  );
};

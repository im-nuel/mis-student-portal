import { Image } from "@mantine/core";
import { Box, UnstyledButton } from "@mantine/core";
import { ImagePicker } from "../../image_picker/image_picker";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { ImageProps } from "../../image_picker/ImagePickerProvider";

export const PicturePicker: React.FC<{
  previewImage?: string;
  onSubmit: (image: ImageProps) => void;
}> = ({ previewImage, onSubmit }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [image, setImage] = React.useState<string | undefined>();
  return (
    <UnstyledButton onClick={open}>
      <Image
        bg={"#eee"}
        style={{
          borderRadius: 8,
          overflow: "hidden"
        }}
        height={150}
        width={100}
        withPlaceholder
        src={image || previewImage}
      />
      <ImagePicker
        aspectRatio={3 / 4}
        opened={opened}
        onClose={() => {
          close();
        }}
        onSubmit={async (image) => {
          await onSubmit(image);
          setImage(image.croppedImage);
          close();
        }}
      />
    </UnstyledButton>
  );
};

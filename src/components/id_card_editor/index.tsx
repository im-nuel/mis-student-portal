import { KonvaProvider } from "../react-konva/KonvaContext";
import { KonvaStructure } from "../react-konva/types";
import { Editor } from "./editor";

const initialStructure: KonvaStructure = {
  version: "0.1.1",
  layers: [],
};

export const IDCardEditor = () => {
  return (
    <KonvaProvider initialStructure={initialStructure}>
      <Editor />
    </KonvaProvider>
  );
};

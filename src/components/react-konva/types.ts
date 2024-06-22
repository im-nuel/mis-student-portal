import Konva from "konva";

export interface Transform {
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
  skewX?: number;
  skewY?: number;
  width?: number;
  height?: number;
}

export interface ObjectMetaData {
  [key: string]: any;
}

export interface KonvaObject<T = Konva.NodeConfig> {
  id: string;
  type: "rect" | "circle" | "image" | "text" | string; // Type can be 'rect', 'circle', 'image', etc.
  config: T; // Configuration for each Konva object
  transform?: Transform;
  data: ObjectMetaData;
  _node?: Konva.Node;
}

export interface Group {
  id: string;
  order: number;
  name: string; // Name for the group
  transform?: Transform;
  objects: (KonvaObject | Group)[];
}

export interface Layer {
  id: string;
  name: string; // Name for the layer
  objects: (KonvaObject | Group)[];
}

export interface KonvaStructure {
  version: string;
  layers: Layer[];
}

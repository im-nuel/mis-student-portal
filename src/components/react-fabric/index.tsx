import React from "react";
import { fabric } from "fabric"; // v5
import { CIRCLE, RECTANGLE, TEXT } from "./defaultShape";

type FabricJSEditorOptions = {};
type FabricJSEditorResult = {
  canvas: null | fabric.Canvas;
  action: {
    addText: (props: { text: string }) => void;
    addRectangle: (props?: {}) => void;
    addCircle: (props?: {}) => void;
    addImage: (props: { src: string }) => void;
    removeObject: (object?: fabric.Object) => void;
  };
};

export const useFabricJSEditor = (
  props?: FabricJSEditorOptions
): [(el: HTMLCanvasElement | null) => void, FabricJSEditorResult] => {
  const canvasEl = React.useRef<HTMLCanvasElement>();
  const [canvas, setCanvas] = React.useState<null | fabric.Canvas>(null);

  React.useEffect(() => {
    if (!canvasEl.current) return;
    const options = props;
    const canvas = new fabric.Canvas(canvasEl.current, options);
    // make the fabric.Canvas instance available to your app
    canvas.setWidth(
      canvasEl.current.parentElement?.parentElement?.clientWidth || 100
    );
    canvas.setHeight(
      canvasEl.current.parentElement?.parentElement?.clientHeight || 100
    );
    setCanvas(canvas);
    return () => {
      setCanvas(null);
      canvas.dispose();
    };
  }, []);

  const action: FabricJSEditorResult["action"] = {
    addText({ text }) {
      const object = new fabric.Textbox(text, { ...TEXT, fill: "#000" });
      object.set({ text: text });
      canvas?.add(object);
      canvas?.setActiveObject(object);
    },
    addRectangle(props) {
      const object = new fabric.Rect({
        ...RECTANGLE,
        fill: "#fff",
        stroke: "#777",
      });
      canvas?.add(object);
      canvas?.setActiveObject(object);
    },
    addCircle(props) {
      const object = new fabric.Circle({
        ...CIRCLE,
        fill: "#fff",
        stroke: "#777",
      });
      canvas?.add(object);
      canvas?.setActiveObject(object);
    },
    addImage({ src }) {
      fabric.Image.fromURL(src, function (img) {
        img.on("drop", (event) => {
          event.e.preventDefault();
          const dt = (event.e as any).dataTransfer as DataTransfer;
          const file = dt.files[0];
          if (!file) return;
          console.log(file);
          var reader = new FileReader();

          //attach event handlers here...
          reader.onload = function (e: any) {
            var image = new Image();
            image.src = e.target.result;
            img.setSrc(e.target.result, () => {
              canvas?.renderAll();
            });
          };
          reader.readAsDataURL(file);
        });
        canvas?.add(img);
        canvas?.setActiveObject(img);
      });
    },
    removeObject(object) {
      const obj = object || canvas?.getActiveObject();
      if (!obj) return;
      canvas?.remove(obj);
    },
  };

  const connect = (el: HTMLCanvasElement | null) => {
    if (el) canvasEl.current = el;
  };

  const result = {
    canvas,
    action,
  };

  return [connect, result];
};

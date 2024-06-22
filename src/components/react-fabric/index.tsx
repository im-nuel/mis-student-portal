import React from "react";
import { fabric } from "fabric"; // v5
import { CIRCLE, RECTANGLE, TEXT } from "./defaultShape";
import { ICanvasOptions } from "fabric/fabric-impl";
import { handleKeyMove } from "./keyMove";
import { useDebouncedCallback } from "use-debounce";

type FabricJSEditorValue = { version: string; objects: Object[] };

type FabricJSEditorOptions = {
  fabricOptions: ICanvasOptions;
  onChange?: (value: FabricJSEditorValue, canvas: fabric.Canvas) => void;
  value?: FabricJSEditorValue;
};
type FabricJSEditorResult = {
  canvas: null | fabric.Canvas;
  action: {
    addText: (props: { text: string }) => void;
    addRectangle: (props?: {}) => void;
    addCircle: (props?: {}) => void;
    addImage: (props: { src: string }) => void;
    removeObject: (object?: fabric.Object) => void;
    bringForward: (object?: fabric.Object) => void;
    sendBackwards: (object?: fabric.Object) => void;
    // bringToFront: (object?: fabric.Object) => void;
    // sendToBack: (object?: fabric.Object) => void;
    getSelectedObjects: () => fabric.Object[] | undefined;
  };
};

export const useFabricJSEditor = (
  props?: FabricJSEditorOptions
): [(el: HTMLCanvasElement | null) => void, FabricJSEditorResult] => {
  const canvasEl = React.useRef<HTMLCanvasElement>();
  const [canvas, setCanvas] = React.useState<null | fabric.Canvas>(null);
  const [value, setValue] = React.useState<{
    version: string;
    objects: Object[];
  } | null>(props?.value || null);

  const upadateState = useDebouncedCallback(
    (canvas: fabric.Canvas, e: fabric.IEvent) => {
      const resultJson = canvas.toJSON();
      setValue(resultJson);
    },
    250
  );

  React.useEffect(() => {
    if (!canvasEl.current) return;
    const options = props;
    const el = canvasEl.current;
    const canvas = new fabric.Canvas(el, options?.fabricOptions);

    canvas.loadFromJSON(value, () => {
      canvas.renderAll();
    });

    canvas.setWidth(el.parentElement?.parentElement?.clientWidth || 100);
    canvas.setHeight(el.parentElement?.parentElement?.clientHeight || 100);
    setCanvas(canvas);

    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyMove(canvas, e);
    };

    const handleAfterRender = (e: fabric.IEvent) => {
      upadateState(canvas, e);
    };

    document.addEventListener("keydown", handleKeyDown);
    canvas.on("after:render", handleAfterRender);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      canvas.off("after:render", handleAfterRender);
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
      console.log(object);
    },
    addRectangle(props) {
      const object = new fabric.Rect({
        ...RECTANGLE,
        fill: "#fff",
        stroke: "#777",
      });
      canvas?.add(object);
      canvas?.setActiveObject(object);
      object.setOptions;
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
          var scaleX = img.scaleX || 0;
          var scaleY = img.scaleY || 0;
          var width = img.width || 0;
          var height = img.height || 0;
          console.log(width, height, scaleX * width, scaleY * height);
          event.e.preventDefault();
          const dt = (event.e as any).dataTransfer as DataTransfer;
          const file = dt.files[0];
          if (!file) return;
          var reader = new FileReader();

          //attach event handlers here...
          reader.onload = function (e: any) {
            var image = new Image();
            image.src = e.target.result;
            img.setSrc(e.target.result, () => {
              img.scaleToHeight(scaleY * height);
              img.scaleToWidth(scaleX * width);
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

    bringForward(object) {
      const objects = object ? [object] : canvas?.getActiveObjects();
      if (!objects) return;
      objects.forEach((obj) => {
        if (!obj) return;
        canvas?.bringForward(obj);
      });
    },
    sendBackwards(object) {
      const objects = object ? [object] : canvas?.getActiveObjects();
      if (!objects) return;
      console.log(objects);
      objects.forEach((obj) => {
        if (!obj) return;
        canvas?.sendBackwards(obj);
      });
    },

    getSelectedObjects() {
      return canvas?.getActiveObjects();
    },
  };

  const connect = (el: HTMLCanvasElement | null) => {
    if (el) {
      canvasEl.current = el;
    }
  };

  const result = {
    canvas,
    action,
  };

  return [connect, result];
};

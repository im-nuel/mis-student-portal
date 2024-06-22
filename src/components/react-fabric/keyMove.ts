import { fabric } from "fabric";

export function handleKeyMove(canvas: fabric.Canvas, event: KeyboardEvent) {
  const STEP = 1;
  // prevent scrolling
  // event.preventDefault();
  let keyCode = event.keyCode || event.which;
  let activeGroup = canvas.getActiveObjects();

  if (Array.isArray(activeGroup)) {
    activeGroup.forEach((obj: any) => {
      switch (keyCode) {
        case 37: // left
          obj.left = obj.left - STEP;
          break;
        case 38: // up
          obj.top = obj.top - STEP;
          break;
        case 39: // right
          obj.left = obj.left + STEP;
          break;
        case 40: // down
          obj.top = obj.top + STEP;
          break;
      }
      obj.setCoords();
    });

    canvas.renderAll();
  }
}

// @ts-nocheck

export const includeMagnet = (canvas: fabric.Canvas) => {
  let edgedetection = 20;
  canvas.on("object:moving", function (e) {
    var obj = e.target;
    if (!obj) return;
    obj.setCoords(); // Sets corner position coordinates based on current angle, width and height
    canvas.forEachObject(function (targ) {
      var objects = canvas.getObjects(),
        i = objects.length;
      const activeObject = canvas.getActiveObject();

      if (!activeObject) return;
      if (targ === activeObject) return;

      if (
        Math.abs(activeObject.oCoords.tr.x - targ.oCoords.tl.x) < edgedetection
      ) {
        activeObject.left = targ.left - activeObject.currentWidth;
      }
      if (
        Math.abs(activeObject.oCoords.tl.x - targ.oCoords.tr.x) < edgedetection
      ) {
        activeObject.left = targ.left + targ.currentWidth;
      }
      if (
        Math.abs(activeObject.oCoords.br.y - targ.oCoords.tr.y) < edgedetection
      ) {
        activeObject.top = targ.top - activeObject.currentHeight;
      }
      if (
        Math.abs(targ.oCoords.br.y - activeObject.oCoords.tr.y) < edgedetection
      ) {
        activeObject.top = targ.top + targ.currentHeight;
      }
      if (
        activeObject.intersectsWithObject(targ) &&
        targ.intersectsWithObject(activeObject)
      ) {
        targ.strokeWidth = 10;
        targ.stroke = "red";
      } else {
        targ.strokeWidth = 0;
        targ.stroke = false;
      }
      if (!activeObject.intersectsWithObject(targ)) {
        activeObject.strokeWidth = 0;
        activeObject.stroke = false;
      }
    });
  });
};

export function renderHtmlElementToCanvas(
  htmlElement: HTMLElement,
  scale: number
): HTMLCanvasElement {
  // Create a temporary container off-screen
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.appendChild(htmlElement.cloneNode(true));

  // Append the container to the document body
  document.body.appendChild(container);

  // Get the dimensions of the HTML element
  const width = htmlElement.offsetWidth;
  const height = htmlElement.offsetHeight;

  // Calculate the scaled dimensions
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  // Create a temporary canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Set the dimensions of the canvas
  canvas.width = scaledWidth;
  canvas.height = scaledHeight;

  // Convert the HTML element to a data URL
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${scaledWidth}" height="${scaledHeight}">
      <foreignObject width="100%" height="100%">
        ${new XMLSerializer().serializeToString(container)}
      </foreignObject>
    </svg>
  `;
  const dataUrl =
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);

  // Draw the data URL onto the canvas
  const image = new Image();
  image.src = dataUrl;
  ctx.drawImage(image, 0, 0);

  // Remove the temporary container from the document body
  // document.body.removeChild(container);

  return canvas;
}

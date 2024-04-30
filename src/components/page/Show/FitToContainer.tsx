import React from "react";

export const FitToContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const parent = parentRef.current;
    const child = childRef.current;

    if (parent && child) {
      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;

      const childWidth = child.offsetWidth;
      const childHeight = child.offsetHeight;

      const scaleX = parentWidth / childWidth;
      const scaleY = parentHeight / childHeight;
      const newScale = Math.min(scaleX, scaleY);

      setScale(newScale);
    }
  }, []);

  return (
    <div
      ref={parentRef}
      style={{
        position: "relative",
      }}
    >
      <div
        ref={childRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

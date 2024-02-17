import clsx from "clsx";

import { Mix } from "@/constants/color";

import { mixToRGB } from "@/utils/color";

type CanvasProps = {
  align: "left" | "right";
  classNames?: string;
  mix: Mix;
};

const Canvas = ({ align, classNames, mix }: CanvasProps) => {
  const [r, g, b] = mixToRGB(mix);
  const backgroundColor = `rgb(${r}, ${g}, ${b})`;

  return (
    <div
      class={clsx([
        "h-full w-4/5 shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors duration-300 ease-in-out",
        align === "left" ? "mr-auto rotate-3" : "ml-auto -rotate-3",
        classNames,
      ])}
      style={{
        backgroundColor,
      }}
    />
  );
};

export default Canvas;

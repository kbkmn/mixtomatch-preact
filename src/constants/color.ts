import { RGB } from "@/utils/color";

export const AVAILABLE_COLORS = ["red", "blue", "yellow", "white"] as const;
export type ColorKeys = (typeof AVAILABLE_COLORS)[number];

type BaseColors = {
  [K in ColorKeys]: [number, number, number];
};
export const BASE_COLORS: BaseColors = {
  red: [211, 31, 53],
  blue: [5, 79, 150],
  yellow: [252, 215, 0],
  white: [255, 255, 255],
};

export type Mix = {
  [K in ColorKeys]: number;
};
export const DEFAULT_CANVAS_COLOR: RGB = [233, 228, 221];

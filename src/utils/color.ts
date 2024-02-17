// @ts-ignore
import mixbox from "mixbox";

import {
  AVAILABLE_COLORS,
  BASE_COLORS,
  ColorKeys,
  DEFAULT_CANVAS_COLOR,
  Mix,
} from "@/constants/color";

export const getRandomColor = () =>
  AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)];

export const getEmptyMix = () =>
  AVAILABLE_COLORS.reduce((acc: Mix, color: ColorKeys) => {
    acc[color] = 0;
    return acc;
  }, {} as Mix);

export const createRandomMix = (parts: number) => {
  const mix = getEmptyMix();
  let previousColor = null;

  for (let i = 0; i < parts; i++) {
    let color = getRandomColor();

    while (previousColor === color) {
      color = getRandomColor();
    }

    mix[color] += 1;
    previousColor = color;
  }

  return mix;
};

export type RGB = [number, number, number];

export const getColorDistance = (a: Mix, b: Mix) => {
  const aRGB = mixToRGB(a);
  const bRGB = mixToRGB(b);

  const distance = Math.sqrt(
    Math.pow(aRGB[0] - bRGB[0], 2) +
      Math.pow(aRGB[1] - bRGB[1], 2) +
      Math.pow(aRGB[2] - bRGB[2], 2),
  );
  const maxDistance = Math.sqrt(Math.pow(255, 2) * 3);

  return 100 - (distance / maxDistance) * 100;
};

export const getColorParts = (mix: Mix) =>
  Object.keys(mix).reduce((acc, color) => acc + mix[color as ColorKeys], 0);

export const mixToRGB = (mix: Mix): RGB => {
  const parts = getColorParts(mix);
  if (parts === 0) return DEFAULT_CANVAS_COLOR;

  return mixbox.latentToRgb(
    AVAILABLE_COLORS.reduce((acc, color) => {
      const amount = mix[color];
      const base = BASE_COLORS[color];
      const latent = mixbox
        .rgbToLatent(base)
        .map((part: number) => (part * amount) / parts);

      return acc
        ? (acc as any).map((_: any, i: number) => acc[i] + latent[i])
        : latent;
    }, undefined),
  );
};

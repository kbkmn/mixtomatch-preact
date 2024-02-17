import { Mix } from "./color";

export const DISTANCE_TO_WIN = 99;
export const TOTAL_LIVES = 5;
export type State = {
  target: Mix;
  mix: Mix;
  level: number;
  lives: number;
};

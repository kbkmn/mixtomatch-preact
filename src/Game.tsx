import { useEffect, useState } from "preact/hooks";

import {
  createRandomMix,
  getColorDistance,
  getColorParts,
  getEmptyMix,
} from "@/utils/color";

import { ColorKeys, Mix } from "@/constants/color";
import { Payload, getPayload } from "@/constants/dialog";
import { DISTANCE_TO_WIN, State, TOTAL_LIVES } from "@/constants/gameplay";

import Header from "@/components/Header";
import Canvas from "@/components/Canvas";
import Tube from "@/components/Tube";
import Button from "@/components/Button";
import Dialog from "./components/Dialog";

const Game = () => {
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(5);
  const [target, setTarget] = useState<Mix>(getEmptyMix());
  const [mix, setMix] = useState<Mix>(getEmptyMix());
  const [dialog, setDialog] = useState<Payload | undefined>(undefined);

  const addColor = (color: ColorKeys) => {
    setMix((current) => ({ ...current, [color]: current[color] + 1 }));
  };

  const subtractColor = (color: ColorKeys) => {
    setMix((current) => ({
      ...current,
      [color]: Math.max(current[color] - 1, 0),
    }));
  };

  const clearLevel = () => {
    setMix(getEmptyMix());
  };

  const checkLevel = () => {
    clearLevel();

    const distance = getColorDistance(target, mix);
    const targetColorParts = getColorParts(target);
    const mixColorParts = getColorParts(mix);

    setDialog(getPayload(distance, targetColorParts === mixColorParts, lives));

    if (distance < DISTANCE_TO_WIN) {
      setLives((current) => current - 1);
    }
  };

  const tryAgain = () => {
    setMix(getEmptyMix());
    setDialog(undefined);
  };

  const tryAnotherColor = () => {
    setTarget(createRandomMix(level + 1));
    setMix(getEmptyMix());
    setDialog(undefined);
  };

  const nextLevel = () => {
    setLevel((current) => current + 1);
    setTarget(createRandomMix(level + 2));
    setMix(getEmptyMix());
    setDialog(undefined);
  };

  const startOver = () => {
    setLevel(1);
    setLives(TOTAL_LIVES);
    setTarget(createRandomMix(2));
    setMix(getEmptyMix());
    setDialog(undefined);
  };

  useEffect(() => {
    try {
      const state = JSON.parse(localStorage.getItem("state") ?? "") as State;

      setLevel(state.level);
      setLives(state.lives);
      setTarget(state.target);
      setMix(state.mix);
    } catch (_) {
      setTarget(createRandomMix(2));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "state",
      JSON.stringify({ level, lives, target, mix }),
    );
  }, [level, lives, target, mix]);

  return (
    <>
      <div class="flex min-h-dvh justify-center bg-[#464440]">
        <main class="flex w-full max-w-5xl touch-none flex-col overflow-hidden bg-[#d5d0c9] px-4 pt-6 text-[1.3em]">
          <Header level={level} lives={lives} />

          <div class="my-4 flex w-full grow flex-col items-center justify-center">
            <Canvas align="left" mix={target} />

            <Canvas align="right" classNames="mt-[-2em]" mix={mix} />
          </div>

          <div class="flex h-[3em]">
            {getColorParts(mix) > 0 && (
              <>
                <Button onClick={clearLevel}>Clear</Button>

                <Button onClick={checkLevel}>Check</Button>
              </>
            )}
          </div>

          <div class="flex justify-center">
            {Object.keys(mix).map((color) => (
              <Tube
                color={color as ColorKeys}
                amount={mix[color as ColorKeys]}
                onAdd={addColor}
                onSubtract={subtractColor}
              />
            ))}
          </div>
        </main>
      </div>

      <Dialog
        payload={dialog}
        onTryAgain={tryAgain}
        onTryAnotherColor={tryAnotherColor}
        onNextLevel={nextLevel}
        onStartOver={startOver}
      />
    </>
  );
};

export default Game;

import { HTMLAttributes, createPortal } from "preact/compat";
import clsx from "clsx";

import { Payload } from "@/constants/dialog";

type DialogProps = {
  payload?: Payload;
  onTryAgain: () => void;
  onTryAnotherColor: () => void;
  onNextLevel: () => void;
  onStartOver: () => void;
};

const Dialog = ({
  payload,
  onTryAgain,
  onTryAnotherColor,
  onNextLevel,
  onStartOver,
}: DialogProps) => {
  return payload
    ? createPortal(
        <div class="fixed inset-0 z-50 h-dvh w-full bg-black bg-opacity-50 text-[1.3em] backdrop-blur">
          <div
            open
            class="absolute left-1/2 top-1/2 z-10 flex w-[80%] max-w-[25rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-[0.2em] border-t border-none border-[rgba(255,255,255,0.2)] bg-[#d5d0c9] p-[0.8em] text-center shadow-[0_5px_10px_rgba(0,0,0,0.2)] backdrop:bg-red-500"
          >
            <h2 class="text-[1.3em] font-medium">{payload.title}</h2>

            <p>{payload.description}</p>

            <div class="flex flex-col gap-[1em]">
              {(payload.tryAgain || payload.tryAnotherColor) && (
                <div class="flex justify-center gap-[0.5em]">
                  {payload.tryAgain && (
                    <Button onClick={onTryAgain}>Try Again</Button>
                  )}

                  {payload.tryAnotherColor && (
                    <Button onClick={onTryAnotherColor}>
                      Try Another Color
                    </Button>
                  )}
                </div>
              )}

              {(payload.nextLevel || payload.startOver) && (
                <div class="flex justify-center gap-[0.5em]">
                  {payload.nextLevel && (
                    <Button onClick={onNextLevel}>Next Level</Button>
                  )}

                  {payload.startOver && (
                    <Button onClick={onStartOver}>Start Over</Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default Dialog;

type ButtonProps = HTMLAttributes<HTMLButtonElement> & { accent?: boolean };

const Button = ({ accent = false, children, ...props }: ButtonProps) => {
  return (
    <button
      class={clsx(
        "rounded-[0.1em] border-t border-[color:rgba(255,255,255,0.5)] bg-[#cfcac2] px-[0.5em] py-[0.3em] text-[1em] shadow-[0_1px_2px_rgba(0,0,0,0.2)]",
        accent && "bg-[#504a41] text-white",
      )}
      {...props}
    >
      {children}
    </button>
  );
};

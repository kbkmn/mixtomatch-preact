import { BASE_COLORS, ColorKeys } from "@/constants/color";

type TubeProps = {
  color: ColorKeys;
  amount: number;
  onAdd: (color: ColorKeys) => void;
  onSubtract: (color: ColorKeys) => void;
};

const Tube = ({ color, amount, onAdd, onSubtract }: TubeProps) => {
  const base = BASE_COLORS[color];
  const [r, g, b] = base;

  return (
    <div class="flex w-full max-w-[25%] flex-col items-center">
      <svg height="10" width="10" class="overflow-visible">
        <circle
          class="origin-center transition-transform"
          cx="5"
          cy="5"
          r="5"
          fill="blue"
          style={`fill: rgb(${r}, ${g}, ${b}); transform: scale(${amount});`}
        />
      </svg>

      <button
        onClick={() => onAdd(color)}
        onContextMenu={(e) => {
          e.preventDefault();
          onSubtract(color);
        }}
        style={{
          "--background": `image-set(url("/tubes/${color}.png") 1x, url("/tubes/${color}@2x.png") 2x)`,
        }}
        class="z-10 h-[20dvh] max-h-[12.5rem] min-h-[6.25rem] w-full max-w-[7.5rem] bg-[image:var(--background)] bg-cover bg-top bg-no-repeat outline-none"
      />
    </div>
  );
};

export default Tube;

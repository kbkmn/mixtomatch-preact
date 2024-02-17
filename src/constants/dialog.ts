export type Payload = {
  title: string;
  description: string;
  tryAgain: boolean;
  tryAnotherColor: boolean;
  nextLevel: boolean;
  startOver: boolean;
};

const random = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

export const getPayload = (
  distance: number,
  optimal: boolean,
  lives: number,
): Payload => {
  switch (true) {
    case distance >= 100 && !!optimal:
      return {
        title: random([
          "⭐️⭐️⭐️ Efficiency Maestro!",
          "⭐️⭐️⭐️ Step-Savvy Virtuoso!",
          "⭐️⭐️⭐️ Precision Pioneer!",
          "⭐️⭐️⭐️ Optimal Artist!",
          "⭐️⭐️⭐️ Master of Minimality!",
        ]),
        description: random([
          "Perfection with just the essentials—brilliant!",
          "Pure genius in minimal strokes!",
          "Artistry in economy—every part perfect!",
          "Minimalist mastery for the perfect blend!",
          "Elegance in simplicity—color perfection!",
        ]),
        tryAgain: false,
        tryAnotherColor: false,
        nextLevel: true,
        startOver: false,
      };
    case distance >= 100:
      return {
        title: random([
          "⭐️⭐️ Color Perfection Achieved!",
          "⭐️⭐️ Master Mixer!",
          "⭐️⭐️ Palette Pro!",
          "⭐️⭐️ Ultimate Color Wizardry!",
          "⭐️⭐️ Excellent Match!",
        ]),
        description: random([
          "100% correct mix!",
          "Perfect 100% match!",
          "You nailed the mix!",
          "Great job on the mix!",
          "Excellent mix!",
        ]),
        tryAgain: false,
        tryAnotherColor: true,
        nextLevel: true,
        startOver: false,
      };
    case distance >= 99:
      return {
        title: random([
          "⭐️ Color Brilliance!",
          "⭐️ So close!",
          "⭐️ Near Perfection!",
          "⭐️ One Step from Perfect",
          "⭐️ Touch-Up or Level Up?",
        ]),
        description: random([
          `You're just a shade away from perfection! ${distance.toFixed(2)}% color match.`,
          `You've almost mastered the art of color mixing with a ${distance.toFixed(2)}% match! Proceed or perfect your blend?`,
          `You've achieved a ${distance.toFixed(2)}% color match! Ready to level up, or will you aim for absolute perfection?`,
          `You're on the brink of perfection with a ${distance.toFixed(2)}% match. Do you dare to try for 100% or move on to new challenges?`,
          `Your palette prowess has earned you a ${distance.toFixed(2)}% match. Opt for perfection or embrace the next level of color exploration?`,
        ]),
        tryAgain: true,
        tryAnotherColor: true,
        nextLevel: false,
        startOver: false,
      };
    case lives <= 1:
      return {
        title: "✖️ Game Over",
        description: random([
          `You've achieved a ${distance.toFixed(2)}% match! And you've run out of brushes.`,
        ]),
        tryAgain: false,
        tryAnotherColor: false,
        nextLevel: false,
        startOver: true,
      };
    default:
      return {
        title: random([
          "✖️ Keep Mixing",
          "✖️ Close, But Not Quite",
          "✖️ Almost There",
          "✖️ Aim Higher!",
          "✖️ Brush Up Your Mix",
        ]),
        description: random([
          `You've achieved a ${distance.toFixed(2)}% match! Your color intuition is strong, but the perfect hue is still ahead. Mix again for a closer match.`,
          `With a ${distance.toFixed(2)}% color match, you're on the verge of brilliance. Adjust your mix for that flawless finish.`,
          `You've blended a ${distance.toFixed(2)}% match, showing promising skill. A little tweak could lead you to perfection. Give it another try!`,
          `Your artistic eye has earned you a ${distance.toFixed(2)}% color match. Refine your blend to capture that elusive 100%.`,
          `A ${distance.toFixed(2)}% match is impressive, but perfection awaits. Dive back into your palette and unveil the true artist within.`,
        ]),
        tryAgain: true,
        tryAnotherColor: true,
        nextLevel: false,
        startOver: true,
      };
  }
};

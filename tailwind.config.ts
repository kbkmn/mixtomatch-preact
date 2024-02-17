import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'EB Garamond'", '"Times New Roman"', "Times", "serif"],
        fuck: "EB Garamond",
      },
    },
  },
  plugins: [],
} satisfies Config;

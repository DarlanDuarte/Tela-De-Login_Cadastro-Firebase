import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        sm: { min: "0px", max: "767px" },
        md: { min: "768px", max: "1050px" },
        lg: { min: "1051px", max: "1279px" },
        xl: { min: "1280px", max: "1535px" },
        "2xl": { min: "1536px" },
      },
      boxShadow: {
        "3xl": "3px 1px 6px 4px rbga(0, 0, 0, 0.50)",
        "4xl": "3px 3px 4px 4px rgba(0, 0, 0, 0.75)",
      },
    },
  },
  plugins: [],
};
export default config;

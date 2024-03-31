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
      colors:{
        'pastal-green':"rgb(162 246 206 / var(--tw-bg-opacity))",
        'pastal-blue':"rgb(174 231 250 / var(--tw-bg-opacity))",
        'soft-blue':"#00a6ff"
      }
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['sans-serif']
      },
      colors: {
        titlecolor: '#F9FAFB',
        buttontitle: '#e8eaea',
        cardcolor: '#212936cc',
        buttoncolor: '#4d5562',
        cardcolor2: '#121828',
        background: "var(--background)",
        foreground: "var(--foreground)",
        greytext:  "#5e6371",
        buttonborder:  "#7CA9F3",
        translatecolor:  "#3662E3",
      },
    },
  },
  plugins: [],
};
export default config;

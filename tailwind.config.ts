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
        cardcolor: '#202332',
        buttoncolor: '#4d5562',
        cardcolor2: '#16192a',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;

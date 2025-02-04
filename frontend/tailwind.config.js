/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      zIndex: {
        "-10": "-10",
      },
      transitionProperty: {
        all: "all",
      },
      animation: {
        "spin-and-grow": "spin-and-grow 1s ease-out",
        "shrink-and-fade": "shrinkAndFade 0.5s ease-out forwards",
        slideInFromTop: "slideInFromTop 0.5s ease-out forwards",
        slideUp: "slideUp 0.5s ease-out forwards",
        marquee: "marquee 10s linear infinite",
      },
      keyframes: {
        "spin-and-grow": {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { transform: "scale(1) rotate(360deg)", opacity: 1 },
        },
        shrinkAndFade: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0)" },
        },
        slideInFromTop: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      fontFamily: {
        sans: ["Open Sans", "Arial", "sans-serif"],
        playpen: ["Playpen Sans", "serif"],
        charmonman: ["Charmonman", "serif"],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
        extrabold: 800,
      },
      colors: {
        primary: "#08AF5F",
        secondary: " ",
      },
      placeholderColor: {
        black: "#333",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};

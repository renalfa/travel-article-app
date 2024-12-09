/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "outfit-thin": ["outfit-thin", "sans-serif"],
        "outfit-extralight": ["outfit-extralight", "sans-serif"],
        "outfit-light": ["outfit-light", "sans-serif"],
        "outfit-regular": ["outfit-regular", "sans-serif"],
        "outfit-medium": ["outfit-medium", "sans-serif"],
        "outfit-semibold": ["outfit-semibold", "sans-serif"],
        "outfit-bold": ["outfit-bold", "sans-serif"],
        "outfit-extrabold": ["outfit-extrabold", "sans-serif"],
        "outfit-black": ["outfit-black", "sans-serif"],
        "jost-black": ["jost-black", "sans-serif"],
        "jost-light": ["jost-light", "sans-serif"],
        "jost-semibold": ["jost-semibold", "sans-serif"],
        "jost-regular": ["jost-regular", "sans-serif"],
      },
      colors: {
        home: {
          DEFAULT: "#F4F6FF",
          foreground: "#07031A",
        },
        black: {
          DEFAULT: "#07031A",
          foreground: "#F4F6FF",
        },
        primary: {
          DEFAULT: "#4F8A8B",
          foreground: "#F4F6FF",
        },
        secondary: {
          DEFAULT: "#FBD46D",
          foreground: "#07031A",
        },
      },
    },
  },
  plugins: [],
};

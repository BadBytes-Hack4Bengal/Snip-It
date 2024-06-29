import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
    "./node_modules/daisyui/dist/**/*.js",
    "./node_modules/react-daisyui/dist/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        "landing-heading": "Amatic SC"
      }
    }
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "dracula"]
  },
  plugins: [daisyui]
};

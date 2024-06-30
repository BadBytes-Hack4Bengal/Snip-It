import { createContext, Dispatch, SetStateAction } from "react";

enum Theme {
  Light,
  Dark
}

const ThemeContext = createContext<[Theme, Dispatch<SetStateAction<Theme>>]>([
  Theme.Light,
  () => {
    console.error("Theme context uninitialized!");
  }
]);

export { Theme };
export default ThemeContext;

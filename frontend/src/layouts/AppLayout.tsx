import AppNavbar from "@src/components/AppNavbar";
import ThemeContext, { Theme } from "@src/contexts/ThemeContext";
import { useContext } from "react";
import { Theme as ThemeComponent } from "react-daisyui";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const [theme] = useContext(ThemeContext);
  return (
    <ThemeComponent dataTheme={theme == Theme.Light ? "cupcake" : "dracula"} className="min-h-screen h-screen max-h-screen flex flex-col">
      <AppNavbar />
      <div className="bg-base-100 flex flex-col grow text-base-content overflow-scroll">
        <Outlet />
      </div>
    </ThemeComponent>
  );
};

export default AppLayout;

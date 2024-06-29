import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ThemeContext, { Theme } from "./contexts/ThemeContext";
import { useEffect, useState } from "react";
import AppLayout from "./layouts/AppLayout";
import ExplorePage from "./pages/ExplorePage";
import SearchContext, { ISearchInfo } from "./contexts/SearchContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  const [theme, setTheme] = useState<Theme>(
    localStorage.getItem("theme") == "light" ? Theme.Light : Theme.Dark || Theme.Light
  );
  useEffect(() => {
    window.localStorage.setItem("theme", theme == Theme.Light ? "light" : "dark");
  }, [theme]);
  const [searchInfo, setSearchInfo] = useState<ISearchInfo>({ title: "uploading", tags: ["node", "multer"] });
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <SearchContext.Provider value={[searchInfo, setSearchInfo]}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="/explore" element={<ExplorePage />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </SearchContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;

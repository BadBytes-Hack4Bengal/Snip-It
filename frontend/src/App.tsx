import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ThemeContext, { Theme } from "./contexts/ThemeContext";
import { useEffect, useState } from "react";
import AppLayout from "./layouts/AppLayout";
import ExplorePage from "./pages/ExplorePage";
import SearchContext, { ISearchInfo } from "./contexts/SearchContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContext, { IAuthDetails } from "./contexts/AuthContext";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";

const queryClient = new QueryClient();

const App = () => {
  const [theme, setTheme] = useState<Theme>(
    localStorage.getItem("theme") == "light" ? Theme.Light : Theme.Dark || Theme.Light
  );
  const [authDetails, setAuthDetails] = useState<IAuthDetails>({
    loggedIn: false,
    token: "",
    username: ""
  });
  useEffect(() => {
    window.localStorage.setItem("theme", theme == Theme.Light ? "light" : "dark");
  }, [theme]);
  const [searchInfo, setSearchInfo] = useState<ISearchInfo>({ title: "", tags: [] });
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <AuthContext.Provider value={[authDetails, setAuthDetails]}>
        <SearchContext.Provider value={[searchInfo, setSearchInfo]}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
            </Routes>
          </QueryClientProvider>
        </SearchContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;

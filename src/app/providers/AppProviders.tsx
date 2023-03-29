import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { useTernaryDarkMode } from "usehooks-ts";
import { ThemeProvider } from "styled-components";
import ContextProvider from "../../context/AppContext";
import { darkTheme, ligthTheme } from "../theme";

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const { isDarkMode } = useTernaryDarkMode();

  return (
    <BrowserRouter>
      <ContextProvider>
        <ThemeProvider theme={isDarkMode ? darkTheme : ligthTheme}>
          <RecoilRoot>{children}</RecoilRoot>
        </ThemeProvider>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default AppProviders;

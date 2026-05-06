import { RefineThemes } from "@refinedev/antd";
import { ConfigProvider, theme } from "antd";
import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  const flupTheme = {
    token: {
      colorPrimary: "#2ECC8F",
      colorBgBase: "#F0EFF4",
      colorBgContainer: "#FFFFFF",
      colorBorder: "#E8E8E8",
      colorText: "#1A1A1A",
      colorTextSecondary: "#9B9B9B",
      borderRadius: 8,
      fontFamily: "'DM Sans', sans-serif",
    },
    algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider theme={flupTheme}>
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};

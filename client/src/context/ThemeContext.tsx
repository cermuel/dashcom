import React, { createContext, useEffect } from "react";
import { Theme, ThemeContextType } from "../types/context";

export const ThemeContextProvider = createContext<ThemeContextType>({
  theme: Theme.dark,
  // @ts-ignore
  switchTheme: (theme: Theme) => {},
});

const ThemeContext = ({ children }: { children: React.ReactNode }) => {
  const [theme, switchTheme] = React.useState<Theme | string>(() => {
    let theme = localStorage.getItem("dashcom_theme");
    if (theme) {
      return theme;
    } else {
      return Theme.dark;
    }
  });

  useEffect(() => {
    localStorage.setItem("dashcom_theme", theme);
  }, [theme]);

  return (
    <ThemeContextProvider.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContextProvider.Provider>
  );
};

export default ThemeContext;

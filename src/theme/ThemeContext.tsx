// E:\app\src\theme\ThemeContext.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import { DarkTokens, LightTokens, ThemeTokens } from "./tokens";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  tokens: ThemeTokens;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "dark", // Updated default context value
  tokens: DarkTokens, // Updated default tokens
  toggleTheme: () => {},
  setMode: () => {},
  isDark: true, // Updated default boolean
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Change initial state from 'light' to 'dark' here:
  const [mode, setMode] = useState<ThemeMode>("dark");

  const tokens = useMemo(
    () => (mode === "dark" ? DarkTokens : LightTokens),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        tokens,
        toggleTheme,
        setMode,
        isDark: mode === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

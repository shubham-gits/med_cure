import React, { createContext, useContext, useState, useEffect } from "react";

const THEME_KEY = "mb_theme_pref"; // just a UI preference, not sensitive — fine for localStorage

const LIGHT = {
  mode: "light",
  pageBg: "#f8fafc",
  cardBg: "#ffffff",
  border: "#e2e8f0",
  text: "#0f172a",
  textMuted: "#64748b",
};

const DARK = {
  mode: "dark",
  pageBg: "#0b1220",
  cardBg: "#151f30",
  border: "#263248",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
};

const ThemeContext = createContext({ theme: LIGHT, toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem(THEME_KEY) || "light");

  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  const toggleTheme = () => setMode((m) => (m === "light" ? "dark" : "light"));
  const theme = mode === "dark" ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}

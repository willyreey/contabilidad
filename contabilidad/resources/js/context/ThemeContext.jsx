import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const THEME_KEYS = [
  "--color-primary",
  "--color-background",
  "--color-accent",
  "--color-text",
  "--color-surface",
];

const ThemeContext = createContext(null);

function readThemeFromCssVars() {
  if (typeof window === "undefined") {
    return {};
  }

  const styles = getComputedStyle(document.documentElement);

  return THEME_KEYS.reduce((acc, key) => {
    acc[key] = styles.getPropertyValue(key).trim();
    return acc;
  }, {});
}

export function ThemeProvider({ children }) {
  const [themeVars, setThemeVars] = useState({});

  useEffect(() => {
    setThemeVars(readThemeFromCssVars());
  }, []);

  const setThemeVariable = useCallback((variableName, value) => {
    document.documentElement.style.setProperty(variableName, value);
    setThemeVars((prev) => ({ ...prev, [variableName]: value }));
  }, []);

  const refreshTheme = useCallback(() => {
    setThemeVars(readThemeFromCssVars());
  }, []);

  const value = useMemo(
    () => ({
      themeVars,
      setThemeVariable,
      refreshTheme,
    }),
    [themeVars, setThemeVariable, refreshTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

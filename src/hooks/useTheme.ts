import { useState, useEffect } from "react";

export type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Clean up old localStorage persistence so fresh sessions always start in light mode
    if (typeof window !== "undefined") {
      localStorage.removeItem("theme");
      const sessionTheme = sessionStorage.getItem("theme") as Theme | null;
      if (sessionTheme === "light" || sessionTheme === "dark") {
        return sessionTheme;
      }
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    sessionStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return { theme, toggleTheme, setTheme, isDark: theme === "dark" };
}

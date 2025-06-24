"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";
interface ThemeContext {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const Context = createContext<ThemeContext | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // on mount, read localStorage or OS preference
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      setTheme(saved);
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    }
  }, []);

  // apply to <html>, persist
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <Context.Provider value={{ theme, setTheme }}>{children}</Context.Provider>;
};

export function useTheme() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}
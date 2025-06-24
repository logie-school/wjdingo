// "use client";
// import React, { createContext, useContext, useState, useEffect } from "react";

// type Theme = "light" | "dark";
// interface ThemeContext {
//   theme: Theme;
//   setTheme: (t: Theme) => void;
// }

// const Context = createContext<ThemeContext | null>(null);

// export const ThemeProvider: React.FC<{
//   children: React.ReactNode;
//   forceLight?: boolean;
// }> = ({ children, forceLight = false }) => {
//   // keep internal state but derive actual theme
//   const [themeState, setThemeState] = useState<Theme>("light");
//   const theme: Theme = forceLight ? "light" : themeState;
//   const setTheme = forceLight
//     ? (_: Theme) => {}
//     : (t: Theme) => setThemeState(t);

//   // on mount, read localStorage or OS preference
//   useEffect(() => {
//     if (forceLight) return;
//     const saved = localStorage.getItem("theme") as Theme | null;
//     if (saved) {
//       setTheme(saved);
//     } else {
//       setTheme(
//         window.matchMedia("(prefers-color-scheme: dark)").matches
//           ? "dark"
//           : "light"
//       );
//     }
//   }, []);

//   // apply to <html>, persist
//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     document.documentElement.classList.toggle("light", theme === "light");
//     if (!forceLight) {
//       localStorage.setItem("theme", theme);
//     }
//   }, [theme]);

//   return <Context.Provider value={{ theme, setTheme }}>{children}</Context.Provider>;
// };

// export function useTheme() {
//   const ctx = useContext(Context);
//   if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
//   return ctx;
// }
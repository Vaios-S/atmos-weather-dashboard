import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    }
    if (theme === "dark") {
      setTheme("light");
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

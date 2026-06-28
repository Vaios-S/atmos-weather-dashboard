import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  let savedTheme = localStorage.getItem("theme") || "dark";

  const [theme, setTheme] = useState(savedTheme);

  function toggleTheme() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

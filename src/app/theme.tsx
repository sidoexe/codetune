"use client";
import { createContext, useContext, useState } from "react";

const Context = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <Context.Provider value={[theme, setTheme]}>{children}</Context.Provider>
  );
}

export function useThemeContext() {
  return useContext(Context);
}

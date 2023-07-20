"use client";
import { createContext, useContext, useState } from "react";

const Context = createContext();

export function StationProvider({ children }) {
  const [station, setStation] = useState({});
  return (
    <Context.Provider value={[station, setStation]}>
      {children}
    </Context.Provider>
  );
}

export function useStationContext() {
  return useContext(Context);
}

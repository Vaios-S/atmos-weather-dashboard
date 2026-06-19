import { createContext, useReducer, useEffect, useState } from "react";
import { initialWeatherState, weatherReducer } from "../state/weatherReducer";

export const WeatherContext = createContext();

export default function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(weatherReducer, initialWeatherState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
}

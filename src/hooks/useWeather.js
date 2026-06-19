import { useContext } from "react";
import { WeatherContext } from "../context/WeatherProvider";

export default function useWeather() {
  return useContext(WeatherContext);
}

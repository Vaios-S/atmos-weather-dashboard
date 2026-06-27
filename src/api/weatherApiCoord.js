import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeatherCoord(lat, lon, unit = "metric") {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat: lat,
      lon: lon,
      appid: API_KEY,
      units: unit,
    },
  });

  return response.data;
}

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useWeather from "../hooks/useWeather";
import { getCurrentWeather } from "../api/weatherApi";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function CityDetails() {
  const { cityName } = useParams();
  const { state: weatherState, dispatch: weatherDispatch } = useWeather();
  const [cityDetailWeatherData, setCityDetailWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchCityDetails(cityName) {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentWeather(cityName, weatherState.unit);
      setCityDetailWeatherData(data);
    } catch {
      setError("Failed to load city's details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCityDetails(cityName);
  }, [cityName, weatherState.unit]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!cityDetailWeatherData) return null;
  return (
    <>
      <h1>City Details</h1>

      <h2>{cityDetailWeatherData.name}</h2>
      <p>{cityDetailWeatherData.main.temp}</p>
      <p>{cityDetailWeatherData.main.feels_like}</p>
      <p>{cityDetailWeatherData.weather[0].description}</p>
      <p>{cityDetailWeatherData.main.humidity}</p>
      <p>{cityDetailWeatherData.main.pressure}</p>
      <p>{cityDetailWeatherData.main.temp_min}</p>
      <p>{cityDetailWeatherData.main.temp_max}</p>
      <p>{cityDetailWeatherData.sys.sunrise}</p>
      <p>{cityDetailWeatherData.sys.sunset}</p>
    </>
  );
}

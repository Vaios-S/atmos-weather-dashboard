import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useWeather from "../hooks/useWeather";
import { getCurrentWeather } from "../api/weatherApi";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

  function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage title={error} />;
  if (!cityDetailWeatherData) return null;

  const weatherInfo = cityDetailWeatherData.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`;
  const tempUnit = weatherState.unit === "metric" ? "°C" : "°F";
  const windUnit = weatherState.unit === "metric" ? "m/s" : "mph";

  return (
    <motion.main
      key={cityName}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-6xl flex-col justify-center px-4 py-10"
    >
      <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/45">
            City Details
          </p>

          <h1 className="mt-5 text-5xl font-light tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            {cityDetailWeatherData.name}
          </h1>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <p className="text-8xl font-light tracking-[-0.08em] text-white sm:text-9xl">
              {Math.round(cityDetailWeatherData.main.temp)}
              <span className="ml-2 text-4xl tracking-normal text-white/65">
                {tempUnit}
              </span>
            </p>

            <img
              src={iconUrl}
              alt={weatherInfo.description}
              className="h-32 w-32 object-contain drop-shadow-2xl"
            />
          </div>

          <p className="mt-4 max-w-2xl text-3xl font-light capitalize tracking-[-0.04em] text-white/85 sm:text-4xl">
            {weatherInfo.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl shadow-black/10 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Humidity
            </p>
            <p className="mt-3 text-3xl font-light text-white">
              {cityDetailWeatherData.main.humidity}%
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl shadow-black/10 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Wind
            </p>
            <p className="mt-3 text-3xl font-light text-white">
              {cityDetailWeatherData.wind.speed} {windUnit}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl shadow-black/10 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Pressure
            </p>
            <p className="mt-3 text-3xl font-light text-white">
              {cityDetailWeatherData.main.pressure}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl shadow-black/10 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Feels Like
            </p>
            <p className="mt-3 text-3xl font-light text-white">
              {Math.round(cityDetailWeatherData.main.feels_like)}
              {tempUnit}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-xl shadow-black/10 backdrop-blur-xl">
          <p className="text-sm font-medium text-white/65">Sun cycle</p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                Sunrise
              </p>
              <p className="mt-3 text-3xl font-light text-white">
                {formatTime(cityDetailWeatherData.sys.sunrise)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                Sunset
              </p>
              <p className="mt-3 text-3xl font-light text-white">
                {formatTime(cityDetailWeatherData.sys.sunset)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white/75 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/15 hover:text-white active:scale-[0.98]"
            >
              Back to dashboard
            </Link>
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              to="/favorites"
              className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white/75 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/15 hover:text-white active:scale-[0.98]"
            >
              Back to favorites
            </Link>
          </div>
        </div>
      </div>
    </motion.main>
  );
}

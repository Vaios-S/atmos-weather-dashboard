import { getCurrentWeather } from "../api/weatherApi";
import { getCurrentWeatherCoord } from "../api/weatherApiCoord";
import { useState, useEffect } from "react";
import useWeather from "../hooks/useWeather";
import SearchBar from "../components/weather/SearchBar";
import WeatherCard from "../components/weather/WeatherCard";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import useAuth from "../hooks/useAuth";
import { getWeatherDescription } from "../utils/getWeatherDescription";
import SunCard from "../components/weather/SunCard";
import FormatForecast from "../components/weather/FormatForecast";
import { motion } from "framer-motion";

export default function Home() {
  const [searchData, setSearchData] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loading, setLoading] = useState(false);
  const [weatherCoords, setWeatherCoords] = useState(null);
  const [error, setError] = useState(null);

  const { state: authState, dispatch: authDispatch } = useAuth();
  const { state: weatherState, dispatch: weatherDispatch } = useWeather();

  async function handleSearch(e) {
    e.preventDefault();
    if (searchData.trim() === "") {
      setError("You need to search for a City");
      return;
    }
    setError(null);
    fetchWeather(searchData);
  }

  function findCoords() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lon);
        fetchWeatherCurrentLocation(lat, lon);
      });
      setError(null);
    } else {
      return setError("Geolocation is not supported.");
    }
  }

  useEffect(() => {
    findCoords();
  }, []);

  async function fetchWeatherCurrentLocation(lat, lon) {
    setLoading(true);
    try {
      const data = await getCurrentWeatherCoord(lat, lon, weatherState.unit);
      setWeatherCoords(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchWeather(city) {
    weatherDispatch({ type: "FETCH_WEATHER_START" });
    try {
      const data = await getCurrentWeather(city, weatherState.unit);
      weatherDispatch({ type: "FETCH_WEATHER_SUCCESS", payload: data });
      authDispatch({ type: "ADD_RECENT_SEARCH", payload: data.name });
    } catch (error) {
      weatherDispatch({
        type: "FETCH_WEATHER_ERROR",
        payload: "City not Found",
      });
    }
  }

  useEffect(() => {
    if (searchData.trim() === "") return;
    fetchWeather(searchData);
  }, [weatherState.unit]);

  function handleSelectRecent(city) {
    fetchWeather(city);
  }

  function handleClearHistory() {
    authDispatch({ type: "REMOVE_RECENT_SEARCH" });
  }

  const currentUserData =
    authState.users.find((user) => user.id === authState.currentUser.id)
      .recentSearches || [];

  const mainWeather = weatherState.currentWeather || weatherCoords;

  const description = getWeatherDescription(mainWeather?.weather?.[0]?.main);

  function toTitleCase(str) {
    if (!str) return "";

    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <>
      {weatherCoords ? "" : <Loader />}
      <div className=" overflow-hidden grid min-h-[calc(100vh-7rem)] w-full grid-cols-1 gap-10  lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">
        <motion.section
          key={mainWeather?.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex min-h-[78vh] flex-col justify-center lg:pl-82"
        >
          <div className="max-w-5xl ">
            <p className=" [text-shadow:_0_2px_10px_rgb(0_0_0_/_95%)] b-5 text-xl font-medium tracking-tight text-white">
              Weather Forecast
            </p>

            <h1 className="   mt-5 text-7xl font-light leading-none tracking-[-0.07em] text-white  [text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)] sm:text-8xl lg:text-9xl">
              {mainWeather?.weather?.[0]?.main || "Weather"}
            </h1>

            <p className=" [text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)] mt-6 max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] text-white/85 sm:text-5xl lg:text-6xl">
              {toTitleCase(mainWeather?.weather?.[0]?.description) ||
                "Atmospheric conditions"}
            </p>

            <p className=" [text-shadow:_0_2px_10px_rgb(0_0_0_/_95%)] mt-8 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              {description}
            </p>
          </div>

          <div className="mt-12 max-w-3xl">
            <SearchBar
              value={searchData}
              onSubmit={handleSearch}
              onChange={(e) => setSearchData(e.target.value)}
              recentSearches={[]}
              onSelectRecent={handleSelectRecent}
              onClearHistory={handleClearHistory}
            />
          </div>

          <FormatForecast weather={mainWeather} />

          <section className="mt-10">
            <h2 className=" [text-shadow:_0_2px_10px_rgb(0_0_0_/_65%)] mb-5 text-xl font-medium tracking-tight text-white">
              Recent Searches
            </h2>

            <div className="flex flex-wrap gap-3 max-w-420 ">
              {currentUserData.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleSelectRecent(city)}
                  className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white/75 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/15 hover:text-white active:scale-[0.98]"
                >
                  {city}
                </button>
              ))}
            </div>
          </section>
        </motion.section>

        <aside className="flex flex-col justify-center gap-5 lg:-translate-x-52">
          {mainWeather && <WeatherCard weather={mainWeather} />}

          {mainWeather && <SunCard weather={mainWeather} />}
        </aside>
      </div>{" "}
    </>
  );
}

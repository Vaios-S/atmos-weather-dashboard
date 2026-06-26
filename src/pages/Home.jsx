import { getCurrentWeather } from "../api/weatherApi";
import { useState, useEffect } from "react";
import useWeather from "../hooks/useWeather";
import SearchBar from "../components/weather/SearchBar";
import WeatherCard from "../components/weather/WeatherCard";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const [searchData, setSearchData] = useState("");

  const { state: authState, dispatch: authDispatch } = useAuth();
  const { state: weatherState, dispatch: weatherDispatch } = useWeather();

  async function handleSearch(e) {
    e.preventDefault();
    if (searchData.trim() === "") {
      console.log("You need to search for a City");
      return;
    }
    fetchWeather(searchData);
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
    fetchWeather(searchData);
  }, [weatherState.unit]);

  function handleSelectRecent(city) {
    console.log(city);
    fetchWeather(city);
  }

  function handleClearHistory() {
    authDispatch({ type: "REMOVE_RECENT_SEARCH" });
  }

  const currentUserData = authState.users.find(
    (user) => user.id === authState.currentUser.id,
  ).recentSearches;

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Weather Dashboard
          </h1>

          <p className="mt-2 text-white/60">
            Search current weather conditions around the world.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <SearchBar
            value={searchData}
            onSubmit={handleSearch}
            onChange={(e) => setSearchData(e.target.value)}
            recentSearches={currentUserData}
            onSelectRecent={handleSelectRecent}
            onClearHistory={handleClearHistory}
          />
        </div>

        {weatherState.loading && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">
            <Loader />
          </div>
        )}

        <div className="flex justify-center">
          {weatherState.currentWeather && (
            <WeatherCard weather={weatherState.currentWeather} />
          )}
        </div>

        {weatherState.error && (
          <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300">
            <ErrorMessage message={weatherState.error} />
          </div>
        )}
      </div>
    </>
  );
}

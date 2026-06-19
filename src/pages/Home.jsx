import { getCurrentWeather } from "../api/weatherApi";
import { useState } from "react";
import useWeather from "../hooks/useWeather";
import SearchBar from "../components/weather/SearchBar";
import WeatherCard from "../components/weather/WeatherCard";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function Home() {
  const [searchData, setSearchData] = useState("");
  const { state, dispatch } = useWeather();

  async function handleSearch(e) {
    e.preventDefault();
    if (searchData.trim() === "") {
      console.log("You need to search for a City");
      return;
    }
    dispatch({ type: "FETCH_WEATHER_START" });
    try {
      const data = await getCurrentWeather(searchData, state.unit);
      dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_WEATHER_ERROR", payload: "City not Found" });
    }
  }

  return (
    <>
      <h1>Home</h1>

      <SearchBar
        value={searchData}
        onSubmit={handleSearch}
        onChange={(e) => setSearchData(e.target.value)}
      />
      {state.loading && <Loader />}
      {state.currentWeather && <WeatherCard weather={state.currentWeather} />}
      {state.error && <ErrorMessage message={state.error} />}
    </>
  );
}

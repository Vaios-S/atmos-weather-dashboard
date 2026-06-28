import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useWeather from "../hooks/useWeather";
import { getCurrentWeather } from "../api/weatherApi";
import WeatherCard from "../components/weather/WeatherCard";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function Favorites() {
  const { state: authState, dispatch: authDispatch } = useAuth();
  const { state: weatherState, dispatch: weatherDispatch } = useWeather();
  const [favoriteWeatherData, setFavoriteWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUserData = authState.users.find(
    (user) => user.id === authState.currentUser.id,
  );

  const favorites = currentUserData?.favorites || [];

  useEffect(() => {
    async function fetchFavoritesWeather() {
      if (favorites.length === 0) {
        setFavoriteWeatherData([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const weatherPromises = favorites.map((city) =>
          getCurrentWeather(city, weatherState.unit),
        );

        const weatherData = await Promise.all(weatherPromises);

        setFavoriteWeatherData(weatherData);
      } catch (error) {
        setError("Failed to load favorite cities");
      } finally {
        setLoading(false);
      }
    }

    fetchFavoritesWeather();
  }, [favorites, weatherState.unit]);

  return (
    <>
      <h1>Favorites</h1>

      {favorites.length === 0 && <p>No favorites cities yet.</p>}
      {favorites &&
        favorites.map((city) => (
          <div key={city}>
            <p>{city}</p>
            <button
              onClick={() =>
                authDispatch({ type: "REMOVE_FAVORITES", payload: city })
              }
            >
              Remove
            </button>
          </div>
        ))}
      {loading ? (
        <Loader />
      ) : (
        favoriteWeatherData.map((weather) => (
          <WeatherCard key={weather.id} weather={weather} />
        ))
      )}
      {error && <ErrorMessage title={error} />}
    </>
  );
}

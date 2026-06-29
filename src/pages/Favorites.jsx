import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useWeather from "../hooks/useWeather";
import { getCurrentWeather } from "../api/weatherApi";
import WeatherCard from "../components/weather/WeatherCard";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import { motion } from "framer-motion";

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
      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto min-h-[calc(100vh-7rem)] w-full max-w-7xl px-4 py-10"
      >
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/45">
            Saved cities
          </p>

          <h1 className="mt-5 text-5xl font-light tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            Favorites
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            Your saved cities, gathered into one calm and atmospheric weather
            space.
          </p>
        </div>

        {error && (
          <div className="mb-8 max-w-xl">
            <ErrorMessage message={error} />
          </div>
        )}

        {favorites.length === 0 && (
          <div className="flex min-h-[45vh] items-center justify-center">
            <div className="w-full max-w-xl rounded-3xl border border-white/15 bg-white/10 px-8 py-12 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/15 bg-white/10 text-3xl shadow-lg shadow-black/10 backdrop-blur-xl">
                ☆
              </div>

              <h2 className="text-2xl font-medium tracking-tight text-white">
                No favorite cities yet
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/65">
                Save cities from the dashboard and return to their weather
                instantly.
              </p>
            </div>
          </div>
        )}

        {favoriteWeatherData.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {favoriteWeatherData.map((weather) => (
              <motion.div
                key={weather.id}
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <WeatherCard weather={weather} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.main>
    </>
  );
}

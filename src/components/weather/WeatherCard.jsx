import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useWeather from "../../hooks/useWeather";
import { motion } from "framer-motion";

export default function WeatherCard({ weather }) {
  const { state: authState, dispatch: authDispatch } = useAuth();
  const { state: weatherState, dispatch: weatherDispatch } = useWeather();

  const currentUserData = authState.users.find(
    (user) => user.id === authState.currentUser.id,
  );

  const favorites = currentUserData?.favorites || [];

  const isFavorite = favorites.includes(weather.name);

  function handleSave() {
    if (isFavorite) {
      authDispatch({
        type: "REMOVE_FAVORITES",
        payload: weather.name,
      });

      return;
    }

    authDispatch({
      type: "ADD_FAVORITES",
      payload: weather.name,
    });
  }

  const temperature = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const description = weather.weather[0].description;
  const icon = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const windUnit = weatherState.unit === "metric" ? "m/s" : "mph";
  const tempUnit = weatherState.unit === "metric" ? "°C" : "°F";

  return (
    <>
      <motion.div
        key={weather.name}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.55,
          ease: "easeOut",
        }}
        className="relative w-full rounded-3xl border border-white/15 bg-white/10 p-7 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
      >
        <button
          type="button"
          onClick={handleSave}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl text-white shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/15 active:scale-95"
        >
          <span className={isFavorite ? "text-white" : "text-white/45"}>
            {isFavorite ? "★" : "☆"}
          </span>
        </button>

        <Link to={`/city/${weather.name}`}>
          <p className="[text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)] text-xl font-medium text-white/85">
            {weather.name}
          </p>
        </Link>

        <div className="mt-6 flex items-center justify-between gap-6">
          <div>
            <p className="text-7xl font-light tracking-[-0.08em] text-white">
              {temperature}
              <span className="ml-2 text-3xl tracking-normal text-white/70">
                {tempUnit}
              </span>
            </p>

            <p className="mt-4 capitalize text-lg font-medium text-white">
              {description}
            </p>

            <p className="mt-2 text-sm text-white/55">
              Feels like {feelsLike}
              {tempUnit}
            </p>
          </div>

          <img
            src={iconUrl}
            alt={description}
            className="h-24 w-24 object-contain drop-shadow-2xl"
          />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="[text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)]  rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
            <p className="text-xs text-white/95">Humidity</p>
            <p className="mt-1 text-lg font-medium text-white">
              {weather.main.humidity}%
            </p>
          </div>

          <div className=" [text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)]   rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
            <p className="text-xs text-white/95">Wind</p>
            <p className="mt-1 text-lg font-medium text-white">
              {weather.wind.speed} {windUnit}
            </p>
          </div>

          <div className="[text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)]  rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
            <p className="text-xs text-white/95">Pressure</p>
            <p className="mt-1 text-lg font-medium text-white">
              {weather.main.pressure}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

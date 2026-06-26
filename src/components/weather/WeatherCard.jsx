import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useWeather from "../../hooks/useWeather";

export default function WeatherCard({ weather }) {
  const { state: authState, dispatch: authDispatch } = useAuth();
  const { state: weatherState, dispatch: weatherDispatch } = useWeather();

  const currentUserData = authState.users.find(
    (user) => user.id === authState.currentUser.id,
  );

  const favorites = currentUserData?.favorites || [];

  const isFavorite = favorites.includes(weather.name);

  function handleSave() {
    if (isFavorite) return;

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
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15">
        <Link
          className="text-2xl font-semibold tracking-tight transition hover:text-blue-300"
          to={`/city/${weather.name}`}
        >
          {weather.name}
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/40">
              Current Weather
            </p>
            <p className="mt-2 capitalize text-white/70">{description}</p>
          </div>

          <img src={iconUrl} alt={description} className="h-20 w-20" />
        </div>
        <div className="mt-8">
          <p className="text-7xl font-light tracking-tighter">
            {temperature}
            {tempUnit}
          </p>
          <p className="mt-2 text-sm text-white/50">
            Feels like {feelsLike}
            {tempUnit}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-black/20 p-4">
            <p className="text-xs text-white/40">Humidity</p>
            <p className="mt-1 text-lg font-semibold">
              {weather.main.humidity}%
            </p>
          </div>

          <div className="rounded-2xl bg-black/20 p-4">
            <p className="text-xs text-white/40">Wind</p>
            <p className="mt-1 text-lg font-semibold">
              {weather.wind.speed} {windUnit}
            </p>
          </div>

          <div className="rounded-2xl bg-black/20 p-4">
            <p className="text-xs text-white/40">Pressure</p>
            <p className="mt-1 text-lg font-semibold">
              {weather.main.pressure}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isFavorite}
          className="mt-6 w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/50"
        >
          {isFavorite ? "Saved to favorites" : "Add to favorites"}
        </button>
      </div>
    </>
  );
}

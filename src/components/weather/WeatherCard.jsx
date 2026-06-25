import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function WeatherCard({ weather }) {
  const { state, dispatch } = useAuth();

  const currentUserData = state.users.find(
    (user) => user.id === state.currentUser.id,
  );

  const favorites = currentUserData?.favorites || [];

  const isFavorite = favorites.includes(weather.name);

  function handleSave() {
    if (isFavorite) return;

    dispatch({
      type: "ADD_FAVORITES",
      payload: weather.name,
    });
  }
  return (
    <>
      <Link to={`/city/${weather.name}`}>
        <h1>{weather.name}</h1>
      </Link>
      <p>{weather.main.temp}</p>
      <p>{weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}</p>
      <p>Wind: {weather.wind.speed}</p>
      <button onClick={handleSave}>
        {isFavorite ? "Saved" : "Add to Favorites"}
      </button>
    </>
  );
}

import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useWeather from "../../hooks/useWeather";

export default function Navbar() {
  const navigate = useNavigate();
  const { state: authState, dispatch: authDispatch } = useAuth();
  const { state: weatherState, dispatch: weatherDispatch } = useWeather();

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <p>{authState.currentUser?.email}</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => weatherDispatch({ type: "TOGGLE_UNIT" })}>
        {weatherState.unit}
      </button>
    </nav>
  );
}

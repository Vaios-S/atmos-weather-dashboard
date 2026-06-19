import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <p>{state.currentUser?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

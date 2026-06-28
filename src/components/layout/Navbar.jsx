import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useWeather from "../../hooks/useWeather";
import useTheme from "../../hooks/useTheme";

export default function Navbar() {
  const navigate = useNavigate();
  const { state: authState, dispatch: authDispatch } = useAuth();
  const { state: weatherState, dispatch: weatherDispatch } = useWeather();
  const { theme, toggleTheme } = useTheme();

  function handleLogout() {
    authDispatch({ type: "LOGOUT" });
    navigate("/login");
    localStorage.removeItem("theme");
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-lg font-semibold tracking-tight">Atmos</p>
        <div className="flex flex-wrap items-center gap-2 text-sm text-white/70 sm:gap-3">
          <NavLink
            className={({ isActive }) =>
              `rounded-full px-3 py-2 transition ${
                isActive
                  ? "bg-white text-zinc-950"
                  : "hover:bg-white/10 hover:text-white"
              }`
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `rounded-full px-3 py-2 transition ${
                isActive
                  ? "bg-white text-zinc-950"
                  : "hover:bg-white/10 hover:text-white"
              }`
            }
            to="/favorites"
          >
            Favorites
          </NavLink>

          <p>{authState.currentUser?.email}</p>
          <button
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            onClick={() => weatherDispatch({ type: "TOGGLE_UNIT" })}
          >
            {weatherState.unit}
          </button>
          <button
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            onClick={toggleTheme}
          >
            {theme === "light" ? "☀️" : "🌑"}
          </button>
        </div>
      </div>
    </nav>
  );
}

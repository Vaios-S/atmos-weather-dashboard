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
    <nav className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-white/15 bg-white/10 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-500">
        <p className="text-lg font-medium tracking-tight text-white">Atmos</p>

        <div className="flex items-center gap-2 text-sm text-white/70">
          <NavLink
            className={({ isActive }) =>
              `rounded-full px-4 py-2 transition-all duration-300 ${
                isActive
                  ? "bg-white/20 text-white shadow-lg shadow-black/10"
                  : "hover:bg-white/10 hover:text-white"
              }`
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `rounded-full px-4 py-2 transition-all duration-300 ${
                isActive
                  ? "bg-white/20 text-white shadow-lg shadow-black/10"
                  : "hover:bg-white/10 hover:text-white"
              }`
            }
            to="/favorites"
          >
            Favorites
          </NavLink>

          <div className="hidden h-6 w-px bg-white/15 sm:block" />

          <p className="hidden max-w-[180px] truncate text-xs text-white/50 md:block">
            {authState.currentUser?.email}
          </p>

          <button
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/70 shadow-sm shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/15 hover:text-white active:scale-[0.98]"
            onClick={handleLogout}
          >
            Logout
          </button>

          <button
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/15 active:scale-[0.98]"
            onClick={() => weatherDispatch({ type: "TOGGLE_UNIT" })}
          >
            {weatherState.unit === "metric" ? "°C" : "°F"}
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm text-white shadow-sm shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/15 active:scale-[0.98]"
            onClick={toggleTheme}
          >
            {theme === "light" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}

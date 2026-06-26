import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import useWeather from "../../hooks/useWeather";
import { getWeatherBackground } from "../../utils/getWeatherBackground";
import useTheme from "../../hooks/useTheme";

export default function AppLayout() {
  const { state } = useWeather();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const weatherMain = state.currentWeather?.weather?.[0]?.main;
  const backgroundImage = getWeatherBackground(weatherMain);

  return (
    <div
      className="
  relative
min-h-screen
bg-cover
bg-center
bg-no-repeat
transition-all
duration-700
ease-in-out
text-white
  "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div
        className={`absolute inset-0 ${isDark ? "bg-black/60" : "bg-white/55"}`}
      />

      <div
        className={`relative z-10 min-h-screen ${isDark ? "text-white" : "text-zinc-950"}`}
      >
        <Navbar />

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

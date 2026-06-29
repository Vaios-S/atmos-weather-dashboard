import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import useWeather from "../../hooks/useWeather";
import { getWeatherBackground } from "../../utils/getWeatherBackground";
import useTheme from "../../hooks/useTheme";

export default function AppLayout() {
  const { state } = useWeather();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const background = getWeatherBackground(
    state.currentWeather?.weather?.[0]?.main,
    state.currentWeather?.weather?.[0]?.description,
  );

  return (
    <div
      className="
  relative
min-h-screen
bg-cover
bg-center
bg-no-repeat
transition-all
duration-1000
ease-in-out
text-white
  "
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div
        className={`absolute inset-0 ${isDark ? "bg-black/40" : "bg-white/0"}`}
      />

      <div
        className={`relative z-10 min-h-screen ${isDark ? "text-white" : "text-zinc-950"}`}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/25" /> */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.28)_100%)]" />
        <Navbar />

        <main className="w-full px-6 py-6 sm:px-8 lg:px-10 2xl:px-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

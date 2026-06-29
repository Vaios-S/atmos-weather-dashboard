import { getCurrentWeatherCoordForecast } from "../../api/weatherApiCoordForecast";
import { getCurrentWeatherForecast } from "../../api/weatherApiForecast";
import { useState, useEffect } from "react";
import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";
import { motion } from "framer-motion";

export default function FormatForecast({ weather }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchForecast(cityName) {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentWeatherForecast(cityName, weather?.unit);
      setForecastData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function formatForecastDays(data) {
    if (!data?.list) return [];

    const groupedDays = {};

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      if (!groupedDays[dayKey]) {
        groupedDays[dayKey] = [];
      }

      groupedDays[dayKey].push(item);
    });

    return Object.entries(groupedDays)
      .slice(0, 5)
      .map(([day, items], index) => {
        const temps = items.map((item) => item.main.temp);
        const maxTemp = Math.round(Math.max(...temps));
        const minTemp = Math.round(Math.min(...temps));

        const middleItem = items[Math.floor(items.length / 2)];
        const weatherInfo = middleItem.weather[0];

        return {
          day: index === 0 ? "Today" : day,
          maxTemp,
          minTemp,
          iconUrl: `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`,
          description: weatherInfo.description,
        };
      });
  }

  useEffect(() => {
    if (!weather?.name) return;
    fetchForecast(weather?.name);
  }, [weather?.name, weather?.unit]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage title={error} />;
  if (!forecastData) return null;
  const forecastDays = formatForecastDays(forecastData);

  return (
    <motion.section
      key={weather?.name}
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
      className="mt-14 w-full max-w-420"
    >
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)]">
        5-Day Forecast
      </h2>

      <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {forecastDays.map((day) => (
            <div
              key={day.day}
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              className=" flex-1 relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-6 text-center shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              <p className="text-lg font-semibold text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)]">
                {day.day}
              </p>

              <img
                src={day.iconUrl}
                alt={day.description}
                className="mx-auto mt-5 h-16 w-16 object-contain drop-shadow-xl"
              />

              <p className="mt-5 text-5xl font-light tracking-tight text-white [text-shadow:_0_2px_12px_rgb(0_0_0_/_45%)]">
                {day.maxTemp}°
              </p>

              <p className="mt-2 text-xl font-light text-white/60">
                {day.minTemp}°
              </p>

              <p className="mt-4 min-h-12 text-base font-medium capitalize leading-snug text-white/75">
                {day.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

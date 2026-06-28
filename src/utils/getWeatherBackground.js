import clear from "../assets/backgrounds/Clear.png";
import brokenClouds from "../assets/backgrounds/Broken Clouds.png";
import drizzle from "../assets/backgrounds/Drizzle.png";
import fewClouds from "../assets/backgrounds/Few Clouds.png";
import mist from "../assets/backgrounds/Mist.png";
import rain from "../assets/backgrounds/Rain.png";
import snow from "../assets/backgrounds/Snow.png";
import thunderstorm from "../assets/backgrounds/Thunderstorm.png";
import defaultBg from "../assets/backgrounds/Clear.png";

export function getWeatherBackground(weatherMain, weatherDescription = "") {
  switch (weatherMain) {
    case "Clear":
      return clear;

    case "Clouds":
      if (weatherDescription.toLowerCase().includes("few")) {
        return fewClouds;
      }
      return brokenClouds;

    case "Drizzle":
      return drizzle;

    case "Rain":
      return rain;

    case "Thunderstorm":
      return thunderstorm;

    case "Snow":
      return snow;

    case "Mist":
    case "Smoke":
    case "Haze":
    case "Fog":
    case "Dust":
    case "Sand":
    case "Ash":
    case "Squall":
    case "Tornado":
      return mist;

    default:
      return defaultBg;
  }
}

import clearbg from "../assets/backgrounds/clear.jpg";
import cloudsBg from "../assets/backgrounds/clouds.jpg";
import drizzleBg from "../assets/backgrounds/Drizzle.jpg";
import rainBg from "../assets/backgrounds/rain.jpg";
import snowBg from "../assets/backgrounds/snow.jpg";
import stormBg from "../assets/backgrounds/Thunderstorm.jpg";
import mistBg from "../assets/backgrounds/Mist.jpg";
import defaultBg from "../assets/backgrounds/clear.jpg";

export function getWeatherBackground(backround) {
  switch (backround) {
    case "Clear":
      return clearbg;
    case "Clouds":
      return cloudsBg;
    case "Drizzle":
      return drizzleBg;
    case "Rain":
      return rainBg;
    case "Snow":
      return snowBg;
    case "Thunderstorm":
      return stormBg;
    case "Mist":
      return mistBg;
    default:
      return defaultBg;
  }
}

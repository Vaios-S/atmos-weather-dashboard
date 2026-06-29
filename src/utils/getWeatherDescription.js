export function getWeatherDescription(weatherMain) {
  switch (weatherMain) {
    case "Clear":
      return "Enjoy clear skies, warm sunshine and perfect conditions for spending time outdoors.";

    case "Clouds":
      return "Clouds are covering the sky, creating calm and comfortable weather throughout the day.";

    case "Drizzle":
      return "Light drizzle is expected. A jacket or umbrella might come in handy.";

    case "Rain":
      return "Steady rainfall is expected, bringing cooler temperatures and wet conditions.";

    case "Thunderstorm":
      return "Thunderstorms are moving through the area with heavy rain and possible lightning.";

    case "Snow":
      return "Snow is falling, creating cold temperatures and beautiful winter scenery.";

    case "Mist":
    case "Fog":
    case "Haze":
    case "Smoke":
    case "Dust":
    case "Sand":
    case "Ash":
      return "Visibility is reduced due to atmospheric conditions. Travel with extra care.";

    case "Squall":
      return "Strong gusty winds are expected for a short period. Secure loose outdoor items.";

    case "Tornado":
      return "Severe weather conditions are present. Stay informed and follow local safety guidance.";

    default:
      return "Current weather conditions are available for your location.";
  }
}

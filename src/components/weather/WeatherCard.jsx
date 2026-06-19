export default function WeatherCard({ weather }) {
  return (
    <>
      <h1>{weather.name}</h1>
      <p>{weather.main.temp}</p>
      <p>{weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}</p>
      <p>Wind: {weather.wind.speed}</p>
    </>
  );
}

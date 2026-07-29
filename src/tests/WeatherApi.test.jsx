import axios from "axios";
import { getCurrentWeather } from "../api/weatherApi";
import { getCurrentWeatherForecast } from "../api/weatherApiForecast";

vi.mock("axios");
const BASE_URL = "https://api.openweathermap.org/data/2.5";

describe("getCurrentWeather", () => {
  test("should return weather data", async () => {
    const mockData = {
      city: "Thessaloni",
      main: {
        temp: 25,
      },
    };

    axios.get.mockResolvedValue({
      data: mockData,
    });

    const result = await getCurrentWeather("Thessaloniki");

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/weather`, {
      params: {
        q: "Thessaloniki",
        appid: expect.any(String),
        units: "metric",
      },
    });
  });

  test("should throw an error when weather fetch fails", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    await expect(getCurrentWeather("Thessaloniki")).rejects.toThrow(
      "Network Error",
    );
  });

  test("should return forecast data", async () => {
    const mockForecast = {
      list: [
        {
          dt: 123456789,
          main: {
            temp: 26,
          },
        },
      ],
    };

    axios.get.mockResolvedValue({
      data: mockForecast,
    });

    const result = await getCurrentWeatherForecast("Thessaloniki");

    expect(result).toEqual(mockForecast);
  });

  test("should call axios with correct forecast parameters", async () => {
    axios.get.mockResolvedValue({
      data: {},
    });

    await getCurrentWeatherForecast("Thessaloniki");

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/forecast`, {
      params: {
        q: "Thessaloniki",
        appid: expect.any(String),
        units: "metric",
      },
    });
  });

  test("should throw an error when forecast fetch fails", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    await expect(getCurrentWeatherForecast("Thessaloniki")).rejects.toThrow(
      "Network Error",
    );
  });

  test("should call axios when fetching forecast", async () => {
    axios.get.mockResolvedValue({
      data: {},
    });

    await getCurrentWeather("Thessaloniki");

    expect(axios.get).toHaveBeenCalled();
  });
});

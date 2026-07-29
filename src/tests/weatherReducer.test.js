import { weatherReducer, initialWeatherState } from "../state/weatherReducer";

describe("weatherReducer", () => {
  test("changes unit from metric to imperial", () => {
    const newState = weatherReducer(initialWeatherState, {
      type: "TOGGLE_UNIT",
    });

    expect(newState.unit).toBe("imperial");
  });

  test("should set loading to true when fetching weather starts", () => {
    const newState = weatherReducer(initialWeatherState, {
      type: "FETCH_WEATHER_START",
    });

    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test("should store weather data when fetching succeeds", () => {
    const newState = weatherReducer(initialWeatherState, {
      type: "FETCH_WEATHER_SUCCESS",
      payload: { name: "Thessaloniki" },
    });

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.currentWeather.name).toBe("Thessaloniki");
  });

  test("should handle weather fetch error", () => {
    const newState = weatherReducer(initialWeatherState, {
      type: "FETCH_WEATHER_ERROR",
      payload: "Failed to fetch weather",
    });

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe("Failed to fetch weather");
  });
});

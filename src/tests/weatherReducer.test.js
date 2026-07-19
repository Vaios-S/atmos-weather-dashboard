import { weatherReducer, initialWeatherState } from "../state/weatherReducer";

describe("weatherReducer", () => {
  test("changes unit from metric to imperial", () => {
    const newState = weatherReducer(initialWeatherState, {
      type: "TOGGLE_UNIT",
    });

    expect(newState.unit).toBe("imperial");
  });

  test("should set loading to true when fetching weather starts", () => {
    const loadingState = weatherReducer(initialWeatherState, {
      type: "FETCH_WEATHER_START",
    });

    expect(loadingState.loading).toBe(true);
    expect(loadingState.error).toBe(null);
  });
});

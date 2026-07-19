import { weatherReducer, initialWeatherState } from "../state/weatherReducer";

describe("weatherReducer", () => {
  test("changes unit from metric to imperial", () => {
    const newState = weatherReducer(initialWeatherState, {
      type: "TOGGLE_UNIT",
    });

    expect(newState.unit).toBe("imperial");
  });
});

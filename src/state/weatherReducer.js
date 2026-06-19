export const initialWeatherState = {
  currentWeather: null,
  loading: false,
  error: null,
  unit: "metric",
};

export function weatherReducer(state, action) {
  switch (action.type) {
    case "FETCH_WEATHER_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_WEATHER_SUCCESS":
      return {
        ...state,
        loading: false,
        currentWeather: action.payload,
        error: null,
      };
    case "FETCH_WEATHER_ERROR":
      return {
        ...state,
        loading: false,
        currentWeather: null,
        error: action.payload,
      };
    case "TOGGLE_UNIT":
      return {
        ...state,
        unit: state.unit === "metric" ? "imperial" : "metric",
      };
    case "CLEAR_WEATHER":
      return { ...state, currentWeather: null, error: null, loading: false };
  }
}

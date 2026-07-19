import axios from "axios";
import { getCurrentWeather } from "../api/weatherApi";

vi.mock("axios");

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
  });
});

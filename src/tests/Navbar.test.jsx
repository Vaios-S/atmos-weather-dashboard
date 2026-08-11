import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import useAuth from "../hooks/useAuth";
import useWeather from "../hooks/useWeather";
import useTheme from "../hooks/useTheme";

vi.mock("../hooks/useAuth");
vi.mock("../hooks/useWeather");
vi.mock("../hooks/useTheme");

describe("Navbar", () => {
  const authDispatch = vi.fn();
  const weatherDispatch = vi.fn();
  const toggleTheme = vi.fn();

  function setupMocks() {
    useAuth.mockReturnValue({
      state: {
        currentUser: {
          email: "test@test.com",
        },
      },
      dispatch: authDispatch,
    });

    useWeather.mockReturnValue({
      state: {
        unit: "metric",
      },
      dispatch: weatherDispatch,
    });

    useTheme.mockReturnValue({
      theme: "light",
      toggleTheme,
    });
  }

  test("should render navbar content", () => {
    setupMocks();

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByText("Atmos")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("should toggle weather unit", async () => {
    const user = userEvent.setup();

    setupMocks();

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "°C" }));

    expect(weatherDispatch).toHaveBeenCalledWith({
      type: "TOGGLE_UNIT",
    });
  });

  test("should toggle theme", async () => {
    const user = userEvent.setup();

    setupMocks();

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "☀️" }));

    expect(toggleTheme).toHaveBeenCalled();
  });
});

import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ProtectedRoute from "../routes/ProtectedRoute";

import useAuth from "../hooks/useAuth";

vi.mock("../hooks/useAuth");

describe("ProtectedRoute", () => {
  test("should render loader while auth is loading", () => {
    useAuth.mockReturnValue({
      isAuthLoaded: false,
      state: {
        currentUser: null,
      },
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Dashboard</h1>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should render loader while auth is loading", () => {
    useAuth.mockReturnValue({
      isAuthLoaded: false,
      state: {
        currentUser: null,
      },
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Dashboard</h1>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should render protected content for authenticated user", () => {
    useAuth.mockReturnValue({
      isAuthLoaded: true,
      state: {
        currentUser: {
          id: 1,
          username: "john",
        },
      },
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Dashboard</h1>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});

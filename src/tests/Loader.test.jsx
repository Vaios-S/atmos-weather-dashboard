import Loader from "../components/ui/Loader";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("Loader", () => {
  test("should render the default loading messages", () => {
    render(<Loader />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(
      screen.getByText("Please wait while we get the data for you."),
    ).toBeInTheDocument();
  });

  test("should render custom loading messages", () => {
    render(<Loader message="Fetching weather..." subMessage="Almost there!" />);

    expect(screen.getByText("Fetching weather...")).toBeInTheDocument();

    expect(screen.getByText("Almost there!")).toBeInTheDocument();
  });
});

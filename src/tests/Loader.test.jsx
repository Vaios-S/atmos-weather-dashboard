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
});

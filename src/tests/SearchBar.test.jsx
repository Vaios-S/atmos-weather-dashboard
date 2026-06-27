import { render, screen } from "@testing-library/react";
import SearchBar from "../components/weather/SearchBar";

describe("SearchBar", () => {
  test("renders search input and search button", () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
        recentSearches={[]}
        onSelectRecent={() => {}}
        onClearHistory={() => {}}
      />,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });
});

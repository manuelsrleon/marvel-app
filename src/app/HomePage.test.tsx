import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HomePage } from "./HomePage";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock("./FavoritesContext", () => ({
  useFavorites: () => ({
    favorites: [],
    filterByFavorites: false,
  }),
}));

describe("HomePage", () => {
  it("renders loading indicator when isLoading is true", () => {
    render(<HomePage />);
    expect(screen.getByTestId("loader-bar")).toBeInTheDocument();
  });

  it("renders search bar", () => {
    render(<HomePage />);
    expect(
      screen.getByPlaceholderText("SEARCH A CHARACTER..."),
    ).toBeInTheDocument();
  });

  it("fetches and renders characters", async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.queryByTestId("loader")).toBeNull();
      expect(screen.getByText(/results/)).toBeInTheDocument();
    });
  });
});

"use client";
import { createContext, useState, useContext } from "react";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (favorite: string) => void;
  filterByFavorites: boolean;
  toggleFavoriteFilter: (state: boolean) => void;
}

type FavoritesProviderType = {
  children: React.ReactNode;
};
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: FavoritesProviderType) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filterByFavorites, setFilterByFavorites] = useState(false);

  const toggleFavorite = (favorite: string) => {
    if (favorites.includes(favorite)) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item !== favorite),
      );
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, favorite]);
    }
  };
  const toggleFavoriteFilter = (state: boolean) => {
    setFilterByFavorites(state);
  };
  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        filterByFavorites,
        toggleFavoriteFilter,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

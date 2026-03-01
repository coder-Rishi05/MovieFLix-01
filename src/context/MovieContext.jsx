import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

function normalizeId(id) {
  const n = Number(id);
  return Number.isNaN(n) ? id : n;
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
}

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavs = localStorage.getItem("favorites");
      return storedFavs ? JSON.parse(storedFavs) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    const id = normalizeId(movieId);
    setFavorites((prev) => prev.filter((movie) => normalizeId(movie.id) !== id));
  };

  const isFavorite = (movieId) => {
    const id = normalizeId(movieId);
    return favorites.some((movie) => normalizeId(movie.id) === id);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

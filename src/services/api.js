const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY || "01b9857b6c02ce28cd7c5e8c079d0444";

const BASE_URL = "https://api.themoviedb.org/3";

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.status_message || `API error: ${response.status}`);
  }
  return data.results ?? [];
}

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return handleResponse(response);
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query,
    )}`,
  );
  return handleResponse(response);
};

const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY || "01b9857b6c02ce28cd7c5e8c079d0444";

const BASE_URL = "https://api.themoviedb.org/3";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message || `API error: ${response.status}`);
  }

  return {
    movies: data.results || [],
    page: data.page || 1,
    totalPages: data.total_pages || 1,
  };
}

// ✅ Accept page parameter
export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  return handleResponse(response);
};

// ✅ Accept page parameter
export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  return handleResponse(response);
};
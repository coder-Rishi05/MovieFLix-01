import React, { useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { useEffect } from "react";
import { searchMovies } from "../services/api";
import { getPopularMovies } from "../services/api";

const Home = () => {
  // const movies = [
  //   {
  //     id: "7c23416a-9932-4b0f-95bc-c3fce8465042",
  //     movie_id: 18316,
  //     title: "Black sheep",
  //     language: "en",
  //     overview:
  //       "An ex-con takes a job driving a truck cross country. What he doesn't know is that the truck is filled with illegal weapons and now he must fight to survive and save his family.",
  //     popularity: 12.91,
  //     vote_count: 227,
  //   },
  //   {
  //     id: "7c23416a-9932-4b0f-95bce8465042",
  //     movie_id: 18316,
  //     title: "Black Dog",
  //     language: "en",
  //     overview:
  //       "An ex-con takes a job driving a truck cross country. What he doesn't know is that the truck is filled with illegal weapons and now he must fight to survive and save his family.",
  //     popularity: 12.91,
  //     vote_count: 227,
  //   },
  //   {
  //     id: "7c23416a-9932-4b0fce8465042",
  //     movie_id: 18316,
  //     title: "Black cat",
  //     language: "en",
  //     overview:
  //       "An ex-con takes a job driving a truck cross country. What he doesn't know is that the truck is filled with illegal weapons and now he must fight to survive and save his family.",
  //     popularity: 12.91,
  //     vote_count: 227,
  //   },
  // ];

  const [searchQuery, setSearchQuery] = useState("");

  const [movies, setMovies] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.log(error);
        setLoading("failder to get movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies()
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchQuery((data) => data);
  };
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form" action="">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="search..."
        />
        <button
          className="search-button"
          onClick={() => searchQuery(searchQuery)}
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="movies-grid">
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().includes(searchQuery) && (
              <MovieCard movie={movie} key={movie.id} />
            )
        )}
      </div>
    </div>
  );
};

export default Home;

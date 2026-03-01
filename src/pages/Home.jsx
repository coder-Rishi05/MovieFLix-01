import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Play, Info } from "lucide-react";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        // Set the first movie as hero if available
        if (popularMovies.length > 0) {
          setHeroMovie(popularMovies[0]);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  // Hero Slider Effect
  useEffect(() => {
    if (movies.length === 0 || searchQuery) return;

    const interval = setInterval(() => {
      setHeroMovie((prev) => {
        if (!prev) return movies[0];
        const currentIndex = movies.findIndex((m) => m.id === prev.id);
        const nextIndex = (currentIndex + 1) % movies.length;
        return movies[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [movies, searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  console.log(heroMovie);
  return (
    <div className="home">
      {/* Hero Section */}
      {!searchQuery && heroMovie && (
        <div
          className="hero"
          key={heroMovie.id}
          style={
            heroMovie.backdrop_path
              ? {
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
                }
              : undefined
          }
        >
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              key={`title-${heroMovie.id}`}
            >
              {heroMovie.title}
            </motion.h1>
            <motion.p
              className="hero-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              key={`overview-${heroMovie.id}`}
            >
              {heroMovie.overview}
            </motion.p>
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="btn-primary">
                <Play size={20} fill="currentColor" /> Play
              </button>
              <button className="btn-secondary">
                <Info size={20} /> More Info
              </button>
            </motion.div>
          </div>
        </div>
      )}

      {/* Search Section */}
      <div className="content-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search for movies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <motion.div className="movies-grid" layout>
            <AnimatePresence>
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Home;

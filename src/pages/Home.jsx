import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Play, Info } from "lucide-react";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heroMovie, setHeroMovie] = useState(null);

  // ✅ Main Data Fetch Effect
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data;

        if (searchQuery) {
          data = await searchMovies(searchQuery, currentPage);
        } else {
          data = await getPopularMovies(currentPage);
        }

        setMovies(data.movies);
        setTotalPages(data.totalPages);

        if (!searchQuery && data.movies.length > 0) {
          setHeroMovie(data.movies[0]);
        }

        setError(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, searchQuery]);

  // ✅ Reset page when new search happens
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Hero Slider
  useEffect(() => {
    if (movies.length === 0 || searchQuery) return;

    const interval = setInterval(() => {
      setHeroMovie((prev) => {
        if (!prev) return movies[0];
        const currentIndex = movies.findIndex((m) => m.id === prev.id);
        const nextIndex = (currentIndex + 1) % movies.length;
        return movies[nextIndex];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [movies, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
  };

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
            >
              {heroMovie.title}
            </motion.h1>

            <motion.p
              className="hero-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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

      {/* Search */}
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
          <>
            <motion.div className="movies-grid" layout>
              <AnimatePresence>
                {movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* ✅ Pagination Controls */}
           <div className="pagination flex items-center justify-center gap-6 mt-10 mb-6">
  
  <button
    disabled={currentPage === 1 || loading}
    onClick={() => setCurrentPage((prev) => prev - 1)}
    className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 
    ${
      currentPage === 1 || loading
        ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
        : "bg-zinc-800 hover:bg-zinc-700 hover:scale-105 active:scale-95 text-white shadow-md"
    }`}
  >
    ← Prev
  </button>

  <span className="text-zinc-300 font-medium tracking-wide">
    Page <span className="text-white">{currentPage}</span> of{" "}
    <span className="text-white">{totalPages}</span>
  </span>

  <button
    disabled={currentPage === totalPages || loading}
    onClick={() => setCurrentPage((prev) => prev + 1)}
    className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 
    ${
      currentPage === totalPages || loading
        ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
        : "bg-zinc-800 hover:bg-zinc-700 hover:scale-105 active:scale-95 text-white shadow-md"
    }`}
  >
    Next →
  </button>

</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
import "../css/Favourites.css";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { motion, AnimatePresence } from "framer-motion";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here</p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2 className="favorites-title">Your Favorites</h2>
      <motion.div 
        className="movies-grid"
        layout
      >
        <AnimatePresence>
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Favorites;

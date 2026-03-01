import "../css/MovieCard.css"
import { useMovieContext } from "../context/MovieContext"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    

    return (
        <motion.div 
            className="movie-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.3 }}
            layout
        >
            <div className="movie-poster">
                {movie.poster_path ? (
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title || "Movie"} />
                ) : (
                  <div className="movie-poster-placeholder" aria-hidden>No image</div>
                )}
                <div className="movie-overlay">
                    <button 
                        className={`favorite-btn ${favorite ? "active" : ""}`} 
                        onClick={onFavoriteClick}
                        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Heart size={24} className="mix-blend-darken" fill={favorite ? "currentColor" : "none"} />
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
                <p>Ratings : {movie.vote_average}</p>
            </div>
        </motion.div>
    )
}

export default MovieCard
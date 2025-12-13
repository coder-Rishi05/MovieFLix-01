import React from "react";
import "../css/MovieCard.css";
import { Heart } from "lucide-react";

const MovieCard = ({ movie }) => {
  function favMovie() {
    alert("clicked");
  }

  return (
    <div className="movie-card ">
      <div className="movie-poster cursor-pointer relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay ">
          <button className="btn" onClick={favMovie}>
           <Heart className="text-white cursor-pointer top-6 right-4 absolute " />
          </button>
        </div>
      </div> 
      <div className="movie-info">
        <h2 className="text-xl text-amber-50" >{movie.title}</h2>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
};

// original_title
export default MovieCard;

import React from "react";
import "../css/MovieCard.css";


const MovieCard = ({ movie }) => {
  function favMovie() {
    alert("clicked");
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={"https"} alt={movie.title} />
        <div className="movie-overlay">
          <button className="btn" onClick={favMovie}>
            💖
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;

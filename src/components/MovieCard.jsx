import React from "react";

const MovieCard = ({ movie }) => {
  function favMovie() {
    alert("clicked");
  }

  return (
    <div className="movie-card">
      <div className="movie-post">
        <img src={""} alt="movie.title" />
        <div className="movie-overlay">
          <button className="btn" onClick={favMovie}>
            💖
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h2>movie.title</h2>
        <p>movie.release_date</p>
      </div>
    </div>
  );
};

export default MovieCard;

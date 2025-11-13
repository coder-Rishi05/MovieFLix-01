import MovieCard from "./components/MovieCard";

const App = () => {
  return (
    <div>
      <MovieCard movie={{ title: "Bahubali  ", release_date: "2015", }} />
      <MovieCard movie={{ title: "Bahubali  ", release_date: "2015", }} />
      {/* <MovieCard movie={{ title: "  ", release_date: "2015", }} /> */}
    </div>
  );
};

export default App;

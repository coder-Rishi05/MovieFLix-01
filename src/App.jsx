import MovieCard from "./components/MovieCard";
import Home from "./pages/Home";

const App = () => {
  return (
    <div  className="text-white bg-zinc-800 w-full h-screen"  >
      <MovieCard movie={{ title: "Bahubali  ", release_date: "2015", }} />
      <MovieCard movie={{ title: "Bahubali  ", release_date: "2015", }} />
      <Home />
      {/* <MovieCard movie={{ title: "  ", release_date: "2015", }} /> */}
    </div>
  );
};

export default App;

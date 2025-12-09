import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./nav/Navbar";
const App = () => {
  return (
    // <div  className="text-white bg-zinc-800 w-full h-screen"  >
    //   <MovieCard movie={{ title: "Bahubali  ", release_date: "2015", }} />
    //   <MovieCard movie={{ title: "Bahubali  ", release_date: "2015", }} />
    //   <Home />
    //   {/* <MovieCard movie={{ title: "  ", release_date: "2015", }} /> */}
    // </div>
    <>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fav" element={<Favorites />} />
          <Route />
          <Route />
        </Routes>
      </div>
    </>
  );
};

export default App;

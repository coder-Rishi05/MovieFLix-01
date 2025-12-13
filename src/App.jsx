import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import Navbar from "./nav/Navbar";
import "./css/App.css";

const App = () => {
  return (
    <MovieProvider>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fav" element={<Favorites />} />
          <Route />
          <Route />
        </Routes>
      </div>
    </MovieProvider>
  );
};

export default App;

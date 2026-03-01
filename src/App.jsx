import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./nav/Navbar";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
        <MovieProvider>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fav" element={<Favorites />} />
            </Routes>
          </div>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

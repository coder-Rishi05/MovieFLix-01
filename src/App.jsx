import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./nav/Navbar";
import AIPage from "./pages/AIPage";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MovieProvider>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fav" element={<Favorites />} />
              <Route path="/ai" element={<AIPage />} />
            </Routes>
          </div>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

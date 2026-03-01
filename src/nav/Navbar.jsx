import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Film } from "lucide-react";
import "../css/Navbar.css";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar glass ">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <Film className="brand-icon" />
          <span>MovieFlix</span>
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/fav" className="nav-link">Favorites</Link>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

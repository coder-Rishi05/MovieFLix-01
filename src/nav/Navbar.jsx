import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";


const Navbar = () => {
  return (
    <div className="navbar text-white" >
      <Link to="/">home</Link>
      <Link to="/fav">fav</Link>
    </div>
  );
};

export default Navbar;

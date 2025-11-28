import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar" >
      <Link to="/">home</Link>
      <Link to="/fav">fav</Link>
    </div>
  );
};

export default Navbar;

import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Mental Health Survey</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#survey">Survey</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <div className="navbar-auth">
        <button className="auth-button sign-in">Sign In</button>
        <button className="auth-button sign-up">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;

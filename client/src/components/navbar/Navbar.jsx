import React, { useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigation = useNavigate();
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleRedirect = (e) => {
    if (e.target.name === "login") {
      navigation("/login");
    }
    if (e.target.name === "register") {
      navigation("/register");
    }
    if (e.target.name === "logout") {
      dispatch({ type: "LOGOUT" });
      navigation("/login");
    }
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">S.K. Booking</span>
        </Link>
        {user ? (
          <button className="navButton" name="logout" onClick={handleRedirect}>
            Logout
          </button>
        ) : (
          <div className="navItems">
            <button
              className="navButton"
              name="register"
              onClick={handleRedirect}
            >
              Register
            </button>
            <button className="navButton" name="login" onClick={handleRedirect}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

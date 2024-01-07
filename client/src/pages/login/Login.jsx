import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const {  loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, []);
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          id="username"
          className="lInput"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          className="lInput"
          placeholder="Password"
          onChange={handleChange}
        />
        <button onClick={handleLogin} disabled={loading} className="lButton">
          Login
        </button>
        {error && <span>{error?.message}</span>}
      </div>
    </div>
  );
};

export default Login;

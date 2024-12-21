import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import Navigation from "./Navigation";
import Users from "./components/admin/Users";
import Login from "./components/auth/Login";
import ChangePassword from "./components/auth/ChangePassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setIsAdmin(decodedToken.isAdmin);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setIsAdmin(decodedToken.isAdmin);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">

          <Router>
            <Navigation isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<ChangePassword />} />
              <Route
                path="/login"
                element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
              />
              <Route path="/users" element={isAdmin ? <Users /> : <Navigate to="/login" />} />
              <Route
                path="/change-password"
                element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />}
              />
            </Routes>
          </Router>
      </header>
    </div>
  );
}

export default App;
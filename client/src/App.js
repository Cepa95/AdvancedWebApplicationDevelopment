import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import Filter from "./Filter";
import WrappedDetails from "./Details";
import { CartProvider } from "./CartContext";
import Cart from "./Cart";
import Navigation from "./Navigation";
import Users from "./components/Users";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";

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
        <CartProvider>
          <Router>
            <Navigation isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<Filter />} />
              <Route path="/details/:subtype" element={<WrappedDetails />} />
              <Route
                path="/login"
                element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/users" element={isAdmin ? <Users /> : <Navigate to="/login" />} />
              <Route
                path="/change-password"
                element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />}
              />
            </Routes>
          </Router>
        </CartProvider>
      </header>
    </div>
  );
}

export default App;
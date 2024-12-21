// eslint-disable-next-line
import "bootswatch/dist/cerulean/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Users from "./components/admin/Users";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ChangePassword from "./components/auth/ChangePassword";
import Products from "./components/products/Products";
import ProductDetails from "./components/products/ProductDetails";

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
    <header className="App-header">
      <Router>
        <Navigation
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/users"
            element={isAdmin ? <Users /> : <Navigate to="/login" />}
          />
          <Route
            path="/change-password"
            element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </header>
  );
}

export default App;

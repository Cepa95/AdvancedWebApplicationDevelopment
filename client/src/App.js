import "bootswatch/dist/vapor/bootstrap.min.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navigation from "./components/Navigation";
import Users from "./components/admin/Users";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ChangePassword from "./components/auth/ChangePassword";
import Home from "./components/Home";
import Products from "./components/products/Products";
import ProductDetails from "./components/products/ProductDetails";
import UpdatePlant from "./components/admin/UpdatePlant";
import CreatePlant from "./components/admin/CreatePlant";
import CreateUser from "./components/admin/CreateUser";
import UserInfo from "./components/admin/UserInfo"; 
import NotFound from "./components/NotFound";

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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={isAdmin ? <Users /> : <Navigate to="/login" />} />
            <Route path="/users/:id" element={isAdmin ? <UserInfo /> : <Navigate to="/login" />} />
            <Route path="/change-password" element={isLoggedIn ? <ChangePassword onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/products" element={<Products isAdmin={isAdmin} />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/update-plant/:id" element={isAdmin ? <UpdatePlant /> : <Navigate to="/login" />} />
            <Route path="/create-plant" element={isAdmin ? <CreatePlant /> : <Navigate to="/login" />} />
            <Route path="/create-user" element={isAdmin ? <CreateUser /> : <Navigate to="/login" />} /> 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
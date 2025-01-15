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
import UpdateProfile from "./components/auth/UpdateProfile"
import Home from "./components/Home";
import Products from "./components/products/Products";
import ProductDetails from "./components/products/ProductDetails";
import UpdatePlant from "./components/admin/UpdatePlant";
import CreatePlant from "./components/admin/CreatePlant";
import CreateUser from "./components/admin/CreateUser";
import UserInfo from "./components/admin/UserInfo"; 
import NotFound from "./components/NotFound";
import UpdateUser from "./components/admin/UpdateUser";
import ChangeUserPassword from "./components/admin/ChangeUserPassword";
import Manufacturers from "./components/manufacturers/Manufacturers";
import ManufacturerDetails from "./components/manufacturers/ManufacturerDetails";
import UpdateManufacturer from "./components/admin/UpdateManufacturer";
import CreateManufacturer from "./components/admin/CreateManufacturer"; 
import Cart from "./components/cart/Cart"; 
import Wishlist from "./components/wishlist/Wishlist";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setIsAdmin(decodedToken.isAdmin);
      setUserName(decodedToken.name)
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setIsAdmin(decodedToken.isAdmin);
      setUserName(decodedToken.name)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName("")
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
            <Route path="/update-profile" element={isLoggedIn ? <UpdateProfile onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/products" element={<Products isAdmin={isAdmin} isLoggedIn={isLoggedIn} userName={userName} />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/update-plant/:id" element={isAdmin ? <UpdatePlant /> : <Navigate to="/login" />} />
            <Route path="/create-plant" element={isAdmin ? <CreatePlant /> : <Navigate to="/login" />} />
            <Route path="/create-user" element={isAdmin ? <CreateUser /> : <Navigate to="/login" />} /> 
            <Route path="/change-user-password/:id" element={isAdmin ? <ChangeUserPassword /> : <Navigate to="/login" />} /> 
            <Route path="/update-user/:id" element={isAdmin ? <UpdateUser /> : <Navigate to="/login" />} /> 
            <Route path="/manufacturers" element={<Manufacturers isAdmin={isAdmin} />} />
            <Route path="/manufacturers/:id" element={<ManufacturerDetails />} />
            <Route path="/update-manufacturer/:id" element={isAdmin ? <UpdateManufacturer /> : <Navigate to="/login" />} /> 
            <Route path="/create-manufacturer" element={isAdmin ? <CreateManufacturer /> : <Navigate to="/login" />} />
            <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
            <Route path="/wishlist" element={isLoggedIn ? <Wishlist /> : <Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
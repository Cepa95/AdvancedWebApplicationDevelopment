import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn, isAdmin, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ePlant
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/manufacturers">
                Manufacturers
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/create-plant">
                  Plants
                </Link>
              </li>
            )}
                {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin-stats">
                  Stats
                </Link>
              </li>
            )}
          </ul>
           <ul className="navbar-nav ms-auto">
            {isLoggedIn &&
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                <i className="bi bi-heart"></i>
              </Link>
            </li>
            }
           {isLoggedIn && <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart"></i>
              </Link>
            </li>
            }
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/update-profile">
                  <i className="bi bi-gear"></i>
                </Link>
              </li>
            )}
            {isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={onLogout}>
                  <i className="bi bi-box-arrow-left"></i>
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="bi bi-box-arrow-in-right"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

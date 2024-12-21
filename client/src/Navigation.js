import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn, isAdmin, onLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/users">Users</Link>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <Link to="/" onClick={onLogout}>
              Logout
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/change-password">Change Password</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

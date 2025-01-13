import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const UpdateProfile = ({ onLogout }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/users/profile");
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        setError("Error fetching user profile");
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/settings/update-profile", {
        name,
        email,
      });
      setError("");
      onLogout();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <br></br>
      <div className="card">
        <div className="card-header">
          <h1>Update Profile</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
            <div className="card-footer text-center mt-3">
              <Link to="/change-password" style={{ textDecoration: "none" }}>
                Change your password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

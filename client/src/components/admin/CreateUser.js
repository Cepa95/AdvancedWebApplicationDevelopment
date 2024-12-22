import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    isAdmin: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await api.post("/users", {
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      });
      navigate("/users");
    } catch (error) {
      setError("Error creating user");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h1>Create User</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="repeatPassword" className="form-label">Repeat Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="repeatPassword"
                    name="repeatPassword"
                    value={user.repeatPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isAdmin"
                    name="isAdmin"
                    checked={user.isAdmin}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isAdmin">Admin</label>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Create User</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
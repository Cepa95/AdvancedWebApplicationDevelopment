import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", isAdmin: false });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        setError("Error fetching user information");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, isAdmin } = user; // Exclude password from the update data
      const updateData = { name, email, isAdmin };

      await api.put(`/users/${id}`, updateData);
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      setError("Error updating user information");
    }
  };

  return (
    <div className="container mt-5">
      <br></br>
      <div className="card">
        <div className="card-header">
          <h1>Update User</h1>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
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
              <label htmlFor="email" className="form-label">Email</label>
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
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Update User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
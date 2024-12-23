import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const ChangeUserPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== repeatPassword) {
      setError("New password and repeat password do not match");
      return;
    }
    try {
      const response = await api.put(`/settings/admin/change-password/${id}`, {
        oldPassword,
        newPassword,
      });
      setSuccess(response.data.message);
      setError("");
      setOldPassword("");
      setNewPassword("");
      setRepeatPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "Error changing password");
      setSuccess("");
    }
  };

  return (
    
    <div className="container mt-5">
      <br></br>
      <div className="card">
        <div className="card-header">
          <h1>Change User Password</h1>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="oldPassword" className="form-label">
                Old Password
              </label>
              <input
                type="text"
                className="form-control"
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="repeatPassword" className="form-label">
                Repeat New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="repeatPassword"
                name="repeatPassword"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserPassword;

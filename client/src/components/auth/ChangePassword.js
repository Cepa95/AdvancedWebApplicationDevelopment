import React, { useState } from 'react';
import api from '../../api';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/settings/change-password', {
        oldPassword,
        newPassword,
      });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1>Change Password</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="oldPassword" className="form-label">Old Password:</label>
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">New Password:</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Change Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
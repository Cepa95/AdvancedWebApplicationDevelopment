import React, { useState } from 'react';
import api from '../api';

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
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
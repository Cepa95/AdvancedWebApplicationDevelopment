import React, { useEffect, useState } from "react";
import api from "../../api";

const AdminUsers = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await api.get("/users/admins");
        setAdmins(response.data);
      } catch (error) {
        setError("Error fetching admin users");
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="container mt-5">
      <br></br>
      <h1>Admin Users</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {admins.map((admin) => (
          <li key={admin._id} className="list-group-item">
            {admin.name} ({admin.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;

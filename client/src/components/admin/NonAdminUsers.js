import React, { useEffect, useState } from "react";
import api from "../../api";

const NonAdminUsers = () => {
  const [nonAdmins, setNonAdmins] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNonAdmins = async () => {
      try {
        const response = await api.get("/users/non-admins");
        setNonAdmins(response.data);
      } catch (error) {
        setError("Error fetching non-admin users");
      }
    };

    fetchNonAdmins();
  }, []);

  return (
    <div className="container mt-5">
      <br></br>
      <h1>Non-Admin Users</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {nonAdmins.map((nonAdmin) => (
          <li key={nonAdmin._id} className="list-group-item">
            {nonAdmin.name} ({nonAdmin.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NonAdminUsers;

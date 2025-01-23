import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const AdminStats = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [nonAdminCount, setNonAdminCount] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/users/stats");
        setAdminCount(response.data.adminCount);
        setNonAdminCount(response.data.nonAdminCount);
      } catch (error) {
        setError("Error fetching admin stats");
      }
    };

    fetchStats();
  }, []);

  const handleAdminClick = () => {
    navigate("/admin-users");
  };

  const handleNonAdminClick = () => {
    navigate("/non-admin-users");
  };

  return (
    <div className="container mt-5">
      <br></br>
      <h1>Admin Statistics</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Statistics</h5>
          <p className="card-text">
            <strong>Admin Users:</strong>{" "}
            <span onClick={handleAdminClick} style={{ cursor: "pointer", color: "blue" }}>
              {adminCount}
            </span>
          </p>
          <p className="card-text">
            <strong>Non-Admin Users:</strong>{" "}
            <span onClick={handleNonAdminClick} style={{ cursor: "pointer", color: "blue" }}>
              {nonAdminCount}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
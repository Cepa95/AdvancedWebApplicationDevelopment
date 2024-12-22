import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      <Link to={`/create-user`} className="btn btn-info btn-sm mx-3">Add New User</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/users/${user._id}`} className="btn btn-info btn-sm me-4 mb-2">Get Info</Link>
                <Link to={`/update-user/${user._id}`} className="btn btn-secondary btn-sm me-4 mb-2">Update</Link>
                <button onClick={() => handleDelete(user._id)} className="btn btn-danger btn-sm mb-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
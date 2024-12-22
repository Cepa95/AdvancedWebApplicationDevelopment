import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`/users?page=${page}&limit=${limit}`);
        setUsers(response.data.users);
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [page]);

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const totalPages = Math.ceil(totalUsers / limit);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
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
                <Link to={`/users/${user._id}`} className="btn btn-info btn-sm me-5">Get Info</Link>
                <Link to={`/update-user/${user._id}`} className="btn btn-secondary btn-sm me-5">Update</Link>
                <button onClick={() => handleDelete(user._id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
          </li>
          {getPageNumbers().map((pageNumber) => (
            <li key={pageNumber} className={`page-item ${page === pageNumber ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPage(pageNumber)}>{pageNumber}</button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Users;
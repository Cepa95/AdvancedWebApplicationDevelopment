import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
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

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>User Information</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name: {user.name}</h5>
          <p className="card-text">Email: {user.email}</p>
          <p className="card-text">Admin: {user.isAdmin ? "Yes" : "No"}</p>
          <h5 className="card-title mt-4">Wishlist</h5>
          <ul className="list-group mb-4">
            {user.wishlist.map((item) => (
              <li key={item.plantId?._id} className="list-group-item">
                {item.plantId?.name || "Unknown Plant"}
              </li>
            ))}
          </ul>
          <h5 className="card-title">Cart</h5>
          <ul className="list-group">
            {user.cart.map((item) => (
              <li key={item.plantId?._id} className="list-group-item">
                {item.plantId?.name || "Unknown Plant"} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
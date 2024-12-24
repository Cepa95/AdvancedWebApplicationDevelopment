import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState("");
  const [plantToRemove, setPlantToRemove] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await api.get("/wishlist");
        setWishlist(response.data);
      } catch (error) {
        setError("Error fetching wishlist");
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async () => {
    try {
      await api.delete(`/wishlist/${plantToRemove}`);
      setWishlist(
        wishlist.filter((item) => item.plantId._id !== plantToRemove)
      );
      setPlantToRemove(null);
    } catch (error) {
      setError("Error removing product from wishlist");
    }
  };

  return (
    <div className="container mt-5">
      <br></br>
      <h1>Wishlist</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {wishlist.map((item) => (
          <div key={item.plantId._id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={item.plantId.image}
                className="card-img-top"
                alt={item.plantId.name}
              />
              <div className="card-body">
                <h5 className="card-title">{item.plantId.name}</h5>
                <p className="card-text">{item.plantId.description}</p>
                <p className="card-text">
                  <strong>Price:</strong> ${item.plantId.price}
                </p>
                {item.plantId.manufacturer && (
                  <p className="card-text">
                    <strong>Manufacturer:</strong>{" "}
                    {item.plantId.manufacturer.name}
                  </p>
                )}
                <div className="d-flex justify-content-between">
                  <Link
                    to={`/products/${item.plantId._id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => setPlantToRemove(item.plantId._id)}
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#removeFromWishlistModal"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Remove from Wishlist Modal */}
      <div
        className="modal fade"
        id="removeFromWishlistModal"
        tabIndex="-1"
        aria-labelledby="removeFromWishlistModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="removeFromWishlistModalLabel">
                Remove from Wishlist
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to remove this product from your wishlist?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleRemoveFromWishlist}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

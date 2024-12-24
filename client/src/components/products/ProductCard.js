import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
  plant,
  isAdmin,
  isLoggedIn,
  isInWishlist,
  setWishlistMessage,
  setSelectedPlant,
  setPlantToDelete,
  wishlistMessage,
  selectedPlant,
}) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          {isAdmin && (
            <>
              <Link to={`/update-plant/${plant._id}`} className="btn btn-secondary btn-sm me-2">
                Update
              </Link>
              <button
                onClick={() => setPlantToDelete(plant._id)}
                className="btn btn-danger btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
              >
                Delete
              </button>
            </>
          )}
        </div>
        <img src={plant.image} className="card-img-top" alt={plant.name} />
        <div className="card-body">
          <h5 className="card-title">{plant.name}</h5>
          <p className="card-text">{plant.description}</p>
          <p className="card-text"><strong>Price:</strong> ${plant.price}</p>
          {plant.manufacturer && (
            <p className="card-text"><strong>Manufacturer:</strong> {plant.manufacturer.name}</p>
          )}
          <div className="d-flex justify-content-between">
            <Link to={`/products/${plant._id}`} className="btn btn-primary">View Details</Link>
            {isLoggedIn && (
              isInWishlist(plant._id) ? (
                <button
                  className="btn btn-outline-danger"
                  disabled
                >
                  <i className="bi bi-heart-fill"></i>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setWishlistMessage("");
                    setSelectedPlant(plant._id);
                  }}
                  className="btn btn-outline-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#addToWishlistModal"
                >
                  <i className="bi bi-heart"></i>
                </button>
              )
            )}
            {isLoggedIn && (
              <button
                onClick={() => {
                  setSelectedPlant(plant._id);
                }}
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addToCartModal"
              >
                Add To Cart
              </button>
            )}
          </div>
          {wishlistMessage && plant._id === selectedPlant && (
            <div className="alert alert-info mt-3">{wishlistMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
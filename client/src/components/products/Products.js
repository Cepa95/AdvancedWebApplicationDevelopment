import React, { useEffect, useState } from "react";
import api from "../../api";
import ProductCard from "./ProductCard";

const Products = ({ isAdmin, isLoggedIn }) => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState("");
  const [plantToDelete, setPlantToDelete] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("manufacturer-desc");

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await api.get("/plants/sorted-by-manufacturer");
        setPlants(response.data);
      } catch (error) {
        setError("Error fetching plants");
      }
    };

    const fetchWishlist = async () => {
      try {
        if (isLoggedIn) {
          const response = await api.get("/wishlist");
          setWishlist(response.data);
        }
      } catch (error) {
        setError("Error fetching wishlist");
      }
    };

    fetchPlants();
    fetchWishlist();
  }, [isLoggedIn]);

  const handleDelete = async () => {
    try {
      await api.delete(`/plants/${plantToDelete}`);
      setPlants(plants.filter((plant) => plant._id !== plantToDelete));
      setPlantToDelete(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error deleting plant";
      setError(errorMessage);
    }
  };

  const handleAddToCart = async () => {
    try {
      await api.post("/cart/add-to-cart", { plantId: selectedPlant });
    } catch (error) {
      setError("Error adding product to cart");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      setWishlistMessage("");
      await api.post("/wishlist", { plantId: selectedPlant });
      setWishlist([...wishlist, { plantId: selectedPlant }]);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setWishlistMessage("Product already in wishlist");
      } else {
        setError("Error adding product to wishlist");
      }
    }
  };

  const isInWishlist = (plantId) => {
    return wishlist.some((item) => item.plantId === plantId);
  };

  const handleSearch = async () => {
    try {
      const [field, order] = sortOption.split("-");
      const response = await api.get(
        `/search?name=${searchTerm}&sortField=${field}&sortOrder=${order}`
      );
      setPlants(response.data);
    } catch (error) {
      setError("Error searching plants");
    }
  };

  return (
    <div className="container mt-5">
      <br></br>
      {error && (
        <div className="alert alert-danger fixed-error-message">{error}</div>
      )}
      <div className="mb-4">
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <select
            className="form-select me-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name-asc">Name Ascending</option>
            <option value="name-desc">Name Descending</option>
            <option value="price-asc">Price Ascending</option>
            <option value="price-desc">Price Descending</option>
            <option value="manufacturer-asc">Manufacturer Ascending</option>
            <option value="manufacturer-desc">Manufacturer Descending</option>
          </select>
          <button className="btn btn-primary me-2" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="row">
        {plants.map((plant) => (
          <ProductCard
            key={plant._id}
            plant={plant}
            isAdmin={isAdmin}
            isLoggedIn={isLoggedIn}
            isInWishlist={isInWishlist}
            setWishlistMessage={setWishlistMessage}
            setSelectedPlant={setSelectedPlant}
            setPlantToDelete={setPlantToDelete}
            wishlistMessage={wishlistMessage}
            selectedPlant={selectedPlant}
          />
        ))}
      </div>

      {/* Delete Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this plant?
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
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Modal */}
      <div
        className="modal fade"
        id="addToCartModal"
        tabIndex="-1"
        aria-labelledby="addToCartModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addToCartModalLabel">
                Add to Cart
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Do you want to add this product to the cart?
              {error && <div className="alert alert-danger mt-2">{error}</div>}
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
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={handleAddToCart}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Wishlist Modal */}
      <div
        className="modal fade"
        id="addToWishlistModal"
        tabIndex="-1"
        aria-labelledby="addToWishlistModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addToWishlistModalLabel">
                Add to Wishlist
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Do you want to add this product to your wishlist?
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
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={handleAddToWishlist}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

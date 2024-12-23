import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const Products = ({ isAdmin, isLoggedIn }) => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState("");
  const [plantToDelete, setPlantToDelete] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await api.get("/plants/sorted-by-manufacturer");
        setPlants(response.data);
      } catch (error) {
        setError("Error fetching plants");
      }
    };

    fetchPlants();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/plants/${plantToDelete}`);
      setPlants(plants.filter((plant) => plant._id !== plantToDelete));
      setPlantToDelete(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error deleting plant";
      setError(errorMessage);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/cart/add-to-cart",
        { plantId: selectedPlant },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowPopup(false);
    } catch (error) {
      setError("Error adding product to cart");
    }
  };

  return (
    <div className="container mt-5">
      <br></br>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {plants.map((plant) => (
          <div key={plant._id} className="col-md-4 mb-4 mt-1">
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
                  <Link to="/wishlist" className="btn btn-outline-danger">
                    <i className="bi bi-heart"></i>
                  </Link>
                  { (isLoggedIn &&
                    <button
                      onClick={() => {
                        setSelectedPlant(plant._id);
                        setShowPopup(true);
                      }}
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#addToCartModal"
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this plant?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Modal */}
      <div className="modal fade" id="addToCartModal" tabIndex="-1" aria-labelledby="addToCartModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addToCartModalLabel">Add to Cart</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Do you want to add this product to the cart?
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleAddToCart}>
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
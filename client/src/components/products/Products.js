import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const Products = ({ isAdmin }) => {
  const [plants, setPlants] = useState([]);
  const [plantToDelete, setPlantToDelete] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await api.get("/plants/sorted-by-manufacturer");
        setPlants(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
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
      console.error("Error deleting plant:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {plants.map((plant) => (
          <div className="col-md-4 mb-4" key={plant._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                {isAdmin && (
                  <>
                    <Link to={`/update-plant/${plant._id}`} className="btn btn-secondary btn-sm">Update</Link>
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
                  <Link to={`/products/${plant._id}`} className="btn btn-primary">Add To Basket</Link>
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
    </div>
  );
};

export default Products;
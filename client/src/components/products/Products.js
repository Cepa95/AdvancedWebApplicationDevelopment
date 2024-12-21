import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const Products = () => {
  const [plants, setPlants] = useState([]);

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

  return (
    <div className="container mt-5">
      <div className="row">
        {plants.map((plant) => (
          <div className="col-md-4 mb-4" key={plant._id}>
            <div className="card">
              <img
                src={plant.image}
                className="card-img-top"
                alt={plant.name}
              />
              <div className="card-body">
                <h5 className="card-title">{plant.name}</h5>
                <p className="card-text">
                  <strong>Price:</strong> ${plant.price}
                </p>
                {plant.manufacturer && (
                  <p className="card-text">
                    <strong>Manufacturer:</strong> {plant.manufacturer.name}
                  </p>
                )}
                <Link to={`/products/${plant._id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

const ProductDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await api.get(`/plants/${id}`);
        setPlant(response.data);
      } catch (error) {
        console.error("Error fetching plant details:", error);
      }
    };

    fetchPlant();
  }, [id]);

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <br></br>
      <div className="row">
        <div className="col-md-6">
          <img src={plant.image} className="img-fluid" alt={plant.name} />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{plant.name}</h5>
            <p className="card-text">{plant.description}</p>
            <p className="card-text"><strong>Type: </strong>{plant.type}</p>
            <p className="card-text"><strong>Price:</strong> ${plant.price}</p>
            {plant.manufacturer && (
              <p className="card-text"><strong>Manufacturer:</strong> {plant.manufacturer.name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
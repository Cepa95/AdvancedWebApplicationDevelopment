import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const UpdatePlant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState({
    name: "",
    type: "",
    image: "",
    description: "",
    price: "",
    manufacturer: "",
  });
  const [manufacturers, setManufacturers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await api.get(`/plants/${id}`);
        const plantData = response.data;
        setPlant({
          ...plantData,
          manufacturer: plantData.manufacturer._id,
        });
      } catch (error) {
        console.error("Error fetching plant details:", error);
      }
    };

    const fetchManufacturers = async () => {
      try {
        const response = await api.get("/manufacturers");
        setManufacturers(response.data);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
    };

    fetchPlant();
    fetchManufacturers();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlant((prevPlant) => ({
      ...prevPlant,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/plants/${id}`, plant);
      navigate(`/products/${id}`);
    } catch (error) {
      setError("Error updating plant");
    }
  };

  return (
    <div className="container mt-5">
      <br></br>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h1>Update Plant</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={plant.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    name="type"
                    value={plant.type}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image URL:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    value={plant.image}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={plant.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={plant.price}
                    onChange={handleChange}
                    required
                    min="0.01"
                    step="0.01"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="manufacturer" className="form-label">
                    Manufacturer:
                  </label>
                  <select
                    className="form-control"
                    id="manufacturer"
                    name="manufacturer"
                    value={plant.manufacturer}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Manufacturer</option>
                    {manufacturers.map((manufacturer) => (
                      <option key={manufacturer._id} value={manufacturer._id}>
                        {manufacturer.name}
                      </option>
                    ))}
                  </select>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Update Plant
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePlant;

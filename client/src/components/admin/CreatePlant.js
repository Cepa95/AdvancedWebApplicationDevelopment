import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const CreatePlant = () => {
  const [plant, setPlant] = useState({
    name: "",
    type: "",
    image: "",
    description: "",
    price: "",
    manufacturer: ""
  });
  const [manufacturers, setManufacturers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await api.get("/manufacturers");
        setManufacturers(response.data);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
    };

    fetchManufacturers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlant((prevPlant) => ({
      ...prevPlant,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/plants", plant);
      navigate("/products");
    } catch (error) {
      setError("Error creating plant");
    }
  };

  return (
    
    <div className="container mt-5"><br></br>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h1>Create Plant</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
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
                  <label htmlFor="type" className="form-label">Type:</label>
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
                  <label htmlFor="image" className="form-label">Image URL:</label>
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
                  <label htmlFor="description" className="form-label">Description:</label>
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
                  <label htmlFor="price" className="form-label">Price:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={plant.price}
                    onChange={handleChange}
                    required min="1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="manufacturer" className="form-label">Manufacturer:</label>
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
                  <button type="submit" className="btn btn-primary">Create Plant</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlant;
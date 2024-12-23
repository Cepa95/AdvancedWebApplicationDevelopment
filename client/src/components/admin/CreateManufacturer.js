import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const CreateManufacturer = () => {
  const navigate = useNavigate();
  const [manufacturer, setManufacturer] = useState({
    name: "",
    location: "",
    contactInfo: "",
    establishedYear: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManufacturer((prevManufacturer) => ({
      ...prevManufacturer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/manufacturers", manufacturer);
      navigate("/manufacturers");
    } catch (error) {
      setError("Error creating manufacturer");
    }
  };

  return (
    <div className="container mt-5">
      <br></br>
      <div className="card">
        <div className="card-header">
          <h1>Create Manufacturer</h1>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={manufacturer.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={manufacturer.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contactInfo" className="form-label">Contact Info</label>
              <input
                type="text"
                className="form-control"
                id="contactInfo"
                name="contactInfo"
                value={manufacturer.contactInfo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="establishedYear" className="form-label">Established Year</label>
              <input
                type="number"
                className="form-control"
                id="establishedYear"
                name="establishedYear"
                value={manufacturer.establishedYear}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Create Manufacturer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateManufacturer;
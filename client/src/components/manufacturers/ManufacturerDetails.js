import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

const ManufacturerDetails = () => {
  const { id } = useParams();
  const [manufacturer, setManufacturer] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchManufacturer = async () => {
      try {
        const response = await api.get(`/manufacturers/${id}`);
        setManufacturer(response.data);
      } catch (error) {
        setError("Error fetching manufacturer information");
      }
    };

    fetchManufacturer();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!manufacturer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1>Manufacturer Details</h1>
        </div>
        <div className="card-body">
          <h5 className="card-title">Name: {manufacturer.name}</h5>
          <p className="card-text">Location: {manufacturer.location}</p>
          <p className="card-text">Contact Info: {manufacturer.contactInfo}</p>
          <p className="card-text">
            Established Year: {manufacturer.establishedYear}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerDetails;

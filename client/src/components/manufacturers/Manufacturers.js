import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const Manufacturers = ({ isAdmin }) => {
  const [manufacturers, setManufacturers] = useState([]);
  const [error, setError] = useState("");
  const [manufacturerToDelete, setManufacturerToDelete] = useState(null);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await api.get("/manufacturers");
        setManufacturers(response.data);
      } catch (error) {
        setError("Error fetching manufacturers");
      }
    };

    fetchManufacturers();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/manufacturers/${manufacturerToDelete}`);
      setManufacturers(
        manufacturers.filter(
          (manufacturer) => manufacturer._id !== manufacturerToDelete
        )
      );
      setManufacturerToDelete(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error deleting manufacturer";
      setError(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <br></br>
      <h1>Manufacturers</h1>
      {isAdmin && (
        <Link to={`/create-manufacturer`} className="btn btn-info btn-sm mx-3">
          Add New Manufacturer
        </Link>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer) => (
            <tr key={manufacturer._id}>
              <td>{manufacturer.name}</td>
              <td>
                <Link
                  to={`/manufacturers/${manufacturer._id}`}
                  className="btn btn-info btn-sm me-5"
                >
                  View
                </Link>
                {isAdmin && (
                  <>
                    <Link
                      to={`/update-manufacturer/${manufacturer._id}`}
                      className="btn btn-secondary btn-sm me-5"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => setManufacturerToDelete(manufacturer._id)}
                      className="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
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
              Are you sure you want to delete this manufacturer?
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
    </div>
  );
};

export default Manufacturers;

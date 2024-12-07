import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import Modal from "./Modal";

const Results = ({ subtypes, type }) => {
  const { addToCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowModal(true);
  };

  const toggleModal = () => setShowModal(false);

  return (
    <div>
      <ol>
        <h2>{type}</h2>
        {subtypes.map((subtype) => (
          <li key={subtype.id}>
            {subtype.name}
            {subtype.id}
            <Link to={`/details/${subtype.id}`}>
              <button>Details</button>
            </Link>
            <button onClick={() => handleAddToCart({ id: subtype.id, name: subtype.name })}>
              Add to cart
            </button>
            <Link to={`/cart`}>
              <button>Cart</button>
            </Link>
          </li>
        ))}
      </ol>
      {showModal && (
        <Modal>
          <div>
            <h1>Product is added. See basket?</h1>
            <div>
              <Link to={`/cart`}>
                <button>Yes</button>
              </Link>
              <button onClick={toggleModal}>No</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Results;
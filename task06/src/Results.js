import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

const Result = ({ subtypes, type }) => {
  const { addToCart } = useContext(CartContext);

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
            <button
              onClick={() => addToCart({ id: subtype.id, name: subtype.name })}
            >
              Add to cart
            </button>
            <Link to={`/cart`}>
            <button>Cart</button></Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Result;

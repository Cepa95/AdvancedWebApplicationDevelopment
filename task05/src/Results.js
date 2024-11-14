import React from "react";
import { Link } from "react-router-dom";

const Results = ({ subtypes, type }) => {
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
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Results;
import React from "react";

const Results = ({ subtypes, type }) => {
  return (
    <div>
      <ol>
        <h2>{type}</h2>
        {subtypes.map((subtype) => (
          <li key={subtype}>{subtype}</li>
        ))}
      </ol>
    </div>
  );
};

export default Results;

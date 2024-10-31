import React, { useState, useEffect } from "react";

const Filter = () => {
  const [types, setTypes] = useState([]); // stanje za vrste piva
  const [subtypes, setSubtypes] = useState([]); // stanje za podvrste piva
  const [selectedType, setSelectedType] = useState(""); // stanje za odabranu vrstu piva
  const [selectedSubtype, setSelectedSubtype] = useState(""); // stanje za odabranu podvrstu piva

  useEffect(() => {
    fetch("http://demo4497994.mockable.io/vrstePiva")
      .then((response) => response.json())
      .then((data) => setTypes(data)); // azurira stanje za vrste piva
  }, []);

  useEffect(() => {
    if (selectedType) {
      fetch(`http://demo4497994.mockable.io/vrstePiva/${selectedType}`)
        .then((response) => response.json())
        .then((data) => setSubtypes(data)); // azurira stanje za podvrste piva
    }
  }, [selectedType]);

  return (
    <div>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Odaberite vrstu piva</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={selectedSubtype}
        onChange={(e) => setSelectedSubtype(e.target.value)}
      >
        <option value="">Odaberite podvrstu pive</option>
        {subtypes.map((subtype) => (
          <option key={subtype} value={subtype}>
            {subtype}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;

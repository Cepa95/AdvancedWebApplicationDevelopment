import React, { useState, useEffect } from "react";
import Results from "./Results";

const Filter = () => {
  const [types, setTypes] = useState([]); // stanje za vrste piva
  const [subtypes, setSubtypes] = useState([]); // stanje za podvrste piva
  const [selectedType, setSelectedType] = useState(""); // stanje za odabranu vrstu piva
  const [selectedSubtype, setSelectedSubtype] = useState({ id: "", name: "" }); // stanje za odabranu podvrstu piva

  useEffect(() => {
    fetch("http://demo4497994.mockable.io/vrstePiva")
      .then((response) => response.json())
      .then((data) => setTypes(data)); // azurira stanje za vrste piva
  }, []);

  const fetchSubtypes = (type) => {
    if (type) {
      fetch(`http://demo4497994.mockable.io/vrstePiva/${type}`)
        .then((response) => response.json())
        .then((data) => setSubtypes(data)); // azurira stanje za podvrste piva
    }
  };

  useEffect(() => {
    fetchSubtypes(selectedType);
  }, [selectedType]);

  return (
    <div>
      <form>
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
          value={selectedSubtype.name}
          onChange={(e) => {
            const selected = subtypes.find(subtype => subtype.name === e.target.value);
            setSelectedSubtype(selected);
          }}
        >
          <option value="">Odaberite podvrstu pive</option>
          {subtypes.map((subtype) => (
            <option key={subtype.id} value={subtype.name}>
              {subtype.name}
            </option>
          ))}
        </select>
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();
          fetchSubtypes(selectedType);
        }}
      >
        Fetch Data
      </button>
      <Results subtypes={subtypes} type={selectedType} selectedSubtype={selectedSubtype} />
    </div>
  );
};

export default Filter;
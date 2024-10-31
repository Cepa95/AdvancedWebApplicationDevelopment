import React, { useState, useEffect } from "react";
import useDropdown from "./useDropdown";

const Filter = () => {
  const [types, setTypes] = useState([]); // stanje za vrste piva
  const [subtypes, setSubtypes] = useState([]); // stanje za podvrste piva

  const [selectedType, TypeDropdown, setSelectedType] = useDropdown(
    "",
    types
  );
  const [selectedSubtype, SubtypeDropdown, setSelectedSubtype] = useDropdown(
    "",
    subtypes
  );

  useEffect(() => {
    fetch("http://demo4497994.mockable.io/vrstePiva")
      .then((response) => response.json())
      .then((data) => setTypes(data)); 
  }, []);

  useEffect(() => {
    if (selectedType) {
      fetch(`http://demo4497994.mockable.io/vrstePiva/${selectedType}`)
        .then((response) => response.json())
        .then((data) => setSubtypes(data)); 
    }
  }, [selectedType]);

  return (
    <div>
      <TypeDropdown />
      <SubtypeDropdown />
    </div>
  );
};

export default Filter;
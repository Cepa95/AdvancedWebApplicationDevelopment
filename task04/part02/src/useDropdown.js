import React, { useState } from "react";

const useDropdown = (initialState, options = []) => {
  const [state, setState] = useState(initialState);

  const Dropdown = () => (
    <select
      value={state}
      onChange={(e) => setState(e.target.value)}
    >
      <option value="">Odaberite opciju pive</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  return [state, Dropdown, setState];
};

export default useDropdown;
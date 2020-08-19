import React, { useState } from "react";
import './Select.css';
function CustomSelect(props) {
  const [data] = useState(props.data);
  let options = data.map(data => (
    <option key={data.id} value={data.id}>
      {data.name}
    </option>
  ));
  return (
    <select
     className="select-text"
      id = "category"
      name="category"
      onChange={props.handleChange}
    >
    {options}
    </select>

  );
}
export default CustomSelect;
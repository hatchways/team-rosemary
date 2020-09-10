import React, { useContext } from 'react';

import CategoryContext from '../../context/category-context';

import './Select.css';

function CustomSelect(props) {
    const { dvalue } = props;
    const categoryHash = useContext(CategoryContext);

    const options = Object.keys(categoryHash).map(category => (
        <option key={category} value={category}>
            {category}
        </option>
    ));

    return (
        <select
            className="select-text"
            defaultValue={dvalue}
            id="category"
            name="category"
            onChange={props.handleChange}
        >
            <option value="0">Select Category</option>
            {options}
        </select>
    );
}
export default CustomSelect;

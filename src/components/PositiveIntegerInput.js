import './PositiveIntegerInput.css';

import React from "react";

import NumberInput from "./NumberInput.js";

export default function PositiveIntegerInput({name, placeholder, value, onChanged}) {

    return(
        <NumberInput
            name={name}
            pattern="[1-9]\d*" // only positive integers
            placeholder={placeholder}
            value={value}
            onChanged={onChanged}
            parse={(val) => parseInt(val, 10)}
        />
    );
}

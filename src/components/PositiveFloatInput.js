import './PositiveFloatInput.css';

import React from "react";

import NumberInput from "./NumberInput.js";

export default function PositiveFloatInput({name, placeholder, value, onChanged}) {

    return(
        <NumberInput
            name={name}
            pattern="[0-9]\d*\.?\d*$" // only postiive numbers
            placeholder={placeholder}
            value={value}
            onChanged={onChanged}
            parse={(val) => parseFloat(val)}
        />
    );
}

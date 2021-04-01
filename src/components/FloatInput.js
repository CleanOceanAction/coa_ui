import React from "react";

import NumberInput from "./NumberInput.js";

export default function FloatInput({name, placeholder, value, onChanged}) {

    return(
        <NumberInput
            name={name}
            pattern="-|(-?[0-9]\d*\.?\d*$)" // floating numbers
            placeholder={placeholder}
            value={value}
            onChanged={onChanged}
            parse={(val) => parseFloat(val)}
        />
    );
}

import "./NumberInput.css";

import React, { useEffect, useState } from "react";

export default function NumberInput({name, pattern, placeholder, value, onChanged, parse}) {
    const [inputValue, setInputValue] = useState("");

    const getValidNumber = (val) => {
        const parsedValue = parse(val);
        if (parsedValue === undefined || isNaN(parsedValue)) {
            return null;
        }
        return parsedValue;
    }

    const valueToInputString = (val) => {
        return val === undefined || val === null ? "" : val;
    };

    const inputChanged = (e) => {
        e.preventDefault();
        if (e.target.validity.valid || e.target.value === "") {
            setInputValue(e.target.value);
            onChanged(getValidNumber(e.target.value));
        }
    };

    useEffect(() => {
        setInputValue(valueToInputString(value));
        onChanged(value);
    }, [value, onChanged]);

    return(
        <div>
            {name}<br/>
            <input
                name={name.split(" ").join("_").toLowerCase()}
                type="tel"
                pattern={pattern}
                placeholder={placeholder}
                value={inputValue}
                onChange={inputChanged}
            /><br/>
        </div>
    );
}

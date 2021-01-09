import './PositiveIntegerInput.css';
import React, { useEffect, useState } from 'react';

export default function PositiveIntegerInput({name, placeholder, value, onChanged}) {
    const [inputValue, setInputValue] = useState(null);
    const getValidInt = (val) => {
        const parsedValue = parseInt(val, 10);
        if (parsedValue === undefined || isNaN(parsedValue)) {
            return null;
        }
        return parsedValue;
    }

    const valueToInputString = (val) => {
        return val === undefined || val === null ? "" : val;
    };
    
    const inputChanged = (e) => {
        if (e.target.validity.valid || e.target.value === '') {
            setInputValue(e.target.value);
            onChanged(getValidInt(e.target.value));
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
                pattern="[1-9]\d*" // only positive integers
                placeholder={placeholder}
                value={inputValue}
                onChange={inputChanged}
            /><br/>
        </div>
    );
}
  
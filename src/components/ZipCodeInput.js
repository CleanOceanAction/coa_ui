import React, { useEffect, useState } from "react";

export default function ZipCodeInput({name, placeholder, value, onChanged}) {
    const [inputValue, setInputValue] = useState("");

    const inputChanged = (e) => {
        e.preventDefault();
        if (e.target.validity.valid || e.target.value === "") {
            setInputValue(e.target.value);
            onChanged(e.target.value);
        }
    };

    useEffect(() => {
        setInputValue(value);
        onChanged(value);
    }, [value, onChanged]);

    return(
        <div>
            {name}<br/>
            <input
                name={name.split(" ").join("_").toLowerCase()}
                type="tel"
                pattern="^(\d{5}(?:\-\d{4})?)$"
                placeholder={placeholder}
                value={inputValue}
                onChange={inputChanged}
            /><br/>
        </div>
    );
}

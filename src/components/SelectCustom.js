import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

export default function SelectCustom({
        isDisabled = false, optionList, property, value, setValue}) {
    const [options, setOptions] = useState([]);
    const [selection, setSelection] = useState({value: value, label: value});
    
    const select = (option) => {
        setValue(option ? option.value : "");
    }

    useEffect(() => {
        const optionSet = new Set();
        optionList.forEach((option) => optionSet.add(option[property]));
        setOptions(Array.from(optionSet).sort().map(val => {
            return {value: val, label: val}; }));
    }, [optionList, property]);

    useEffect(() => {
        console.log("SelectCustom::useEffect value", value);
        setSelection(value ? {value: value, label: value} : null);
    }, [value]);

    return(
        <CreatableSelect
            bsStyle="default"
            className="select"
            isClearable
            isDisabled={isDisabled}
            value={selection}
            options={options}
            onChange={(option) => select(option)}
        />
    );
}

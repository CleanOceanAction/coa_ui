import './EventDetails.css';
import React, { useEffect, useState } from 'react';
import PositiveIntegerInput from "../../components/PositiveIntegerInput.js";

export default function EventDetails({event, setNumVolunteers, setNumTrashBags, setTrashWeight, setWalkingDistance}) {
    const [trashWeightInput, setTrashWeightInput] = useState("");
    const [walkingDistanceInput, setWalkingDistanceInput] = useState("");

    const getValidFloat = (value) => {
        const parsedValue = parseFloat(value);
        if (parsedValue === undefined || isNaN(parsedValue)) {
            return null;
        }
        return parsedValue;
    }

    const updateTrashWeight = (e) => {
        console.log(trashWeightInput, e.target.validity.valid, e.target.value);
        if (e.target.validity.valid || e.target.value === '') {
            setTrashWeightInput(e.target.value);
            setTrashWeight(getValidFloat(e.target.value));
        }
    };
    
    const updateWalkingDistance = (e) => {
        console.log(walkingDistanceInput, e.target.validity.valid, e.target.value);
        if (e.target.validity.valid || e.target.value === '') {
            setWalkingDistanceInput(e.target.value);
            setWalkingDistance(getValidFloat(e.target.value));
        }
    };

    const valueToInputString = (value) => {
        return value === undefined || value === null ? "" : value;
    };

    useEffect(() => {
        setTrashWeightInput(valueToInputString(event?.trash_weight));
        setWalkingDistanceInput(valueToInputString(event?.walking_distance));

        setTrashWeight(event?.trash_weight);
        setWalkingDistance(event?.walking_distance);
    }, [event, setNumVolunteers, setNumTrashBags, setTrashWeight, setWalkingDistance]);

    return(
        <div>
            <PositiveIntegerInput
                name="Volunteers"
                placeholder="Number of Volunteers"
                value={event?.volunteer_cnt}
                onChanged={setNumVolunteers}
            />
            <PositiveIntegerInput
                name="Trash Bags"
                placeholder="Number of Trash Bags"
                value={event?.trashbag_cnt}
                onChanged={setNumTrashBags}
            />
            Trash Weight (lbs)<br/>
            <input
                name="trashWeight"
                type="tel"
                pattern="[0-9]\d*\.?\d*$" // only postiive numbers
                placeholder="Trash Weight (lbs)"
                value={trashWeightInput}
                onChange={updateTrashWeight}
            /><br/>
            Walking Distance (mi)<br/>
            <input
                name="walkingDistance"
                type="tel"
                pattern="[0-9]\d*\.?\d*$" // only postiive numbers
                placeholder="Walking Distance (mi)"
                value={walkingDistanceInput}
                onChange={updateWalkingDistance}
            />
        </div>
    );
}
  
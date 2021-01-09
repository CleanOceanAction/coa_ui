import './EventDetails.css';
import React, { useEffect, useState } from 'react';

export default function EventDetails({event, setNumVolunteers, setNumTrashBags, setTrashWeight, setWalkingDistance}) {
    const [numVolunteersInput, setNumVolunteersInput] = useState("");
    const [numTrashBagsInput, setNumTrashBagsInput] = useState("");
    const [trashWeightInput, setTrashWeightInput] = useState("");
    const [walkingDistanceInput, setWalkingDistanceInput] = useState("");

    const getValidInt = (value) => {
        const parsedValue = parseInt(value, 10);
        if (parsedValue === undefined || isNaN(parsedValue)) {
            return null;
        }
        return parsedValue;
    }

    const getValidFloat = (value) => {
        const parsedValue = parseFloat(value);
        if (parsedValue === undefined || isNaN(parsedValue)) {
            return null;
        }
        return parsedValue;
    }

    const updateNumVolunteers = (e) => {
        console.log(numVolunteersInput, e.target.validity.valid, e.target.value);
        if (e.target.validity.valid || e.target.value === '') {
            setNumVolunteersInput(e.target.value);
            setNumVolunteers(getValidInt(e.target.value));
        }
    };

    const updateNumTrashBags = (e) => {
        console.log(numTrashBagsInput, e.target.validity.valid, e.target.value);
        if (e.target.validity.valid || e.target.value === '') {
            setNumTrashBagsInput(e.target.value);
            setNumTrashBags(getValidInt(e.target.value));
        }
    };

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
        setNumVolunteersInput(valueToInputString(event?.volunteer_cnt));
        setNumTrashBagsInput(valueToInputString(event?.trashbag_cnt));
        setTrashWeightInput(valueToInputString(event?.trash_weight));
        setWalkingDistanceInput(valueToInputString(event?.walking_distance));

        setNumVolunteers(event?.volunteer_cnt);
        setNumTrashBags(event?.trashbag_cnt);
        setTrashWeight(event?.trash_weight);
        setWalkingDistance(event?.walking_distance);
    }, [event, setNumVolunteers, setNumTrashBags, setTrashWeight, setWalkingDistance]);

    return(
        <div>
            Volunteers<br/>
            <input
                name="numVolunteers"
                type="tel"
                pattern="[1-9]\d*" // only positive integers
                placeholder="Number of Volunteers"
                value={numVolunteersInput}
                onChange={updateNumVolunteers}
            /><br/>
            Trash Bags<br/>
            <input
                name="numTrashBags"
                type="tel"
                pattern="[1-9]\d*" // only positive integers
                placeholder="Number of Trash Bags"
                value={numTrashBagsInput}
                onChange={updateNumTrashBags}
            /><br/>
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
  
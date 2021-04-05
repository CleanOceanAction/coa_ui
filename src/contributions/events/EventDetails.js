import "./EventDetails.css";

import React from "react";

import PositiveFloatInput from "../../components/PositiveFloatInput.js";
import PositiveIntegerInput from "../../components/PositiveIntegerInput.js";

export default function EventDetails({
        numVolunteers, setNumVolunteers,
        numTrashBags, setNumTrashBags,
        walkingDistance, setWalkingDistance,
        trashWeight, setTrashWeight}) {

    return(
        <div>
            <PositiveIntegerInput
                name="Volunteers"
                placeholder="Number of Volunteers"
                value={numVolunteers}
                onChanged={setNumVolunteers}
            />
            <PositiveFloatInput
                name="Trash Bags"
                placeholder="Number of Trash Bags"
                value={numTrashBags}
                onChanged={setNumTrashBags}
            />
            <PositiveFloatInput
                name="Walking Distance (mi)"
                placeholder="Walking Distance (mi)"
                value={walkingDistance}
                onChanged={setWalkingDistance}
            />
            <PositiveFloatInput
                name="Trash Weight (lbs)"
                placeholder="Trash Weight (lbs)"
                value={trashWeight}
                onChanged={setTrashWeight}
            />
        </div>
    );
}

import "./EventDetails.css";

import React from "react";

import PositiveFloatInput from "../../components/PositiveFloatInput.js";
import PositiveIntegerInput from "../../components/PositiveIntegerInput.js";

export default function EventDetails({
        numVolunteers, setNumVolunteers,
        numTrashBags, setNumTrashBags,
        trashWeight, setTrashWeight,
        walkingDistance, setWalkingDistance}) {

    return(
        <div>
            <PositiveIntegerInput
                name="Volunteers"
                placeholder="Number of Volunteers"
                value={numVolunteers}
                onChanged={setNumVolunteers}
            />
            <PositiveIntegerInput
                name="Trash Bags"
                placeholder="Number of Trash Bags"
                value={numTrashBags}
                onChanged={setNumTrashBags}
            />
           <PositiveFloatInput
                name="Trash Weight (lbs)"
                placeholder="Trash Weight (lbs)"
                value={trashWeight}
                onChanged={setTrashWeight}
            />
            <PositiveFloatInput
                name="Walking Distance (mi)"
                placeholder="Walking Distance (mi)"
                value={walkingDistance}
                onChanged={setWalkingDistance}
            />
        </div>
    );
}

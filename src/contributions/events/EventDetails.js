import "./EventDetails.css";

import React from "react";

import PositiveFloatInput from "../../components/PositiveFloatInput.js";
import PositiveIntegerInput from "../../components/PositiveIntegerInput.js";

export default function EventDetails({event, setNumVolunteers, setNumTrashBags, setTrashWeight, setWalkingDistance}) {

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
           <PositiveFloatInput
                name="Trash Weight (lbs)"
                placeholder="Trash Weight (lbs)"
                value={event?.trash_weight}
                onChanged={setTrashWeight}
            />
            <PositiveFloatInput
                name="Walking Distance (mi)"
                placeholder="Walking Distance (mi)"
                value={event?.walking_distance}
                onChanged={setWalkingDistance}
            />
        </div>
    );
}

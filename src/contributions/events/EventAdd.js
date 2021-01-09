import './EventAdd.css';
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

import EventDetails from "./EventDetails.js";
import SiteSelector from "./SiteSelector.js";

export default function EventAddButton(props) {
    const [isPopupVisible, setIsPopupVisible] = useState(undefined);
    const [siteId, setSiteId] = useState(undefined);
    const [numVolunteers, setNumVolunteers] = useState(null);
    const [numTrashBags, setNumTrashBags] = useState(null);
    const [trashWeight, setTrashWeight] = useState(null);
    const [walkingDistance, setWalkingDistance] = useState(null);

    const [hasUpdates, setHasUpdates] = useState(false);

    const handleClose = () => {
        setIsPopupVisible(false);
        props.onClose();
    };

    const handleShow = () => setIsPopupVisible(true);

    const addEventClicked = () => {
        if (props.event) {
            console.log("updateEventClicked for eventId", props.event.event_id);
            console.log("NumVolunteers: ", numVolunteers);
            console.log("NumTrashBags: ", numTrashBags);
            console.log("trashWeight: ", trashWeight);
            console.log("WalkingDistance: ", walkingDistance);
            handleClose();
        }
        else {
            console.log("addEventClicked");
            console.log("NumVolunteers: ", numVolunteers);
            console.log("NumTrashBags: ", numTrashBags);
            console.log("trashWeight: ", trashWeight);
            console.log("WalkingDistance: ", walkingDistance);
            handleClose();
        }
    }

    useEffect(() => {
        console.log("eventAdd useEffect", props.event);
        setSiteId(props.event?.site_id);
    }, [props.event]);

    useEffect(() => {
        console.log("eventAdd useEffect", props.event);
        if (props.event) {
            const isUpdated = (props.event.volunteer_cnt !== numVolunteers
                || props.event.trashbag_cnt !== numTrashBags
                || props.event.trash_weight !== trashWeight
                || props.event.walking_distance !== walkingDistance);
            console.log("isUpdated", isUpdated);
            setHasUpdates(isUpdated);
        }
    }, [numVolunteers, numTrashBags, trashWeight, walkingDistance, props.event]);

    return(
        <div>
            <button onClick={handleShow}>
                Add Cleanup Event
            </button>
            <Modal show={isPopupVisible || !!props.event} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Cleanup Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Location</h4>
                    <SiteSelector
                        isDisabled={!!props.event}
                        selectedSite={props.event}
                        siteId={siteId}
                        setSiteId={setSiteId}
                    />
                    <h4>Details</h4>
                    <EventDetails
                        event={props.event}
                        setNumVolunteers={setNumVolunteers}
                        setNumTrashBags={setNumTrashBags}
                        setTrashWeight={setTrashWeight}
                        setWalkingDistance={setWalkingDistance}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={!siteId || (props.event && !hasUpdates)} variant="primary" onClick={addEventClicked}>
                        {props.event ? "Update" : "Add"}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
  

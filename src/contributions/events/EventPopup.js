import React, {useContext, useEffect, useState} from 'react';

import EventDetails from "./EventDetails.js";
import SiteSelector from "../sites/SiteSelector.js";
import Popup from "../../components/Popup.js";
import { postData } from "../../BackendAccessor.js";
import { userContext } from "../UserContext";

export default function EventPopup({show, onHide, onEventChange, year, season, selectedEvent}) {
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);
    const [siteId, setSiteId] = useState(undefined);

    const [numVolunteers, setNumVolunteers] = useState(null);
    const [numTrashBags, setNumTrashBags] = useState(null);
    const [trashWeight, setTrashWeight] = useState(null);
    const [walkingDistance, setWalkingDistance] = useState(null);

    const {userState} = useContext(userContext);

    const onSubmit = () => {
        console.log("onSubmit");
        if (selectedEvent) {
            updateEvent().then(() => {
                onEventChange();
            });
            onClose();
        }
        else {
            addEvent().then(() => {
                onEventChange();
            });
            setSiteId(undefined);
            clearEventDetails();
        }
    };

    const onClose = () => {
        clearEventDetails();
        onHide();
    };

    const clearEventDetails = () => {
        setNumVolunteers(null);
        setNumTrashBags(null);
        setTrashWeight(null);
        setWalkingDistance(null);
    };

    const addEvent = () => {
        const request = generateEventDetailsObj();
        return postData('events/add', request, userState.token)
            .then((response) => {
                return response.json();
            });
    }

    const updateEvent = () => {
        const request = generateEventDetailsObj();
        request["event_id"] = selectedEvent.event_id;
        return postData('events/update', request, userState.token)
            .then((response) => {
                return response.json();
            });
    };

    const generateEventDetailsObj = () => {
        return {
            "updated_by": userState.name,
            "site_id": siteId,
            "volunteer_year": year,
            "volunteer_season": season,
            "volunteer_cnt": numVolunteers,
            "trashbag_cnt": numTrashBags,
            "trash_weight": trashWeight,
            "walking_distance": walkingDistance
        };
    }

    useEffect(() => {
        if (selectedEvent) {
            console.log("EventPopup::useEffect selectedEvent", selectedEvent);
            setSiteId(selectedEvent.site_id);
            setNumVolunteers(selectedEvent.volunteer_cnt);
            setNumTrashBags(selectedEvent.trashbag_cnt);
            setTrashWeight(selectedEvent.trash_weight);
            setWalkingDistance(selectedEvent.walking_distance);
        }
        else {
            setSubmitDisabled(!siteId);
            setIsUpdate(false);
        }
    }, [selectedEvent, siteId]);

    useEffect(() => {
        if (selectedEvent) {
            console.log("EventPopup::useEffect selectedEvent", selectedEvent);
            setIsUpdate(true);
            setSubmitDisabled(
                selectedEvent.volunteer_cnt === numVolunteers
                && selectedEvent.trashbag_cnt === numTrashBags
                && selectedEvent.trash_weight === trashWeight
                && selectedEvent.walking_distance === walkingDistance);
        }
    }, [selectedEvent, numVolunteers, numTrashBags, trashWeight, walkingDistance]);

    return(
        <div>
        <Popup
            show={show}
            onHide={onClose}
            title={(selectedEvent ? "Update" : "Add") + " Event for " + year + " " + season}
            body={
                <div>
                    <h4>Location</h4>
                    <SiteSelector
                        isDisabled={isUpdate}
                        siteId={siteId}
                        setSiteId={setSiteId}
                    />
                    <h4>Details</h4>
                    <EventDetails
                        numVolunteers={numVolunteers}
                        setNumVolunteers={setNumVolunteers}
                        numTrashBags={numTrashBags}
                        setNumTrashBags={setNumTrashBags}
                        trashWeight={trashWeight}
                        setTrashWeight={setTrashWeight}
                        walkingDistance={walkingDistance}
                        setWalkingDistance={setWalkingDistance}/>
                </div>
            }
            submitDisabled={submitDisabled}
            submitText={selectedEvent ? "Update": "Add"}
            showAddAnother={!selectedEvent}
            onSubmit={onSubmit}
        />
        </div>
    );
} 

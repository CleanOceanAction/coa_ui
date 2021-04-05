import React, {useContext, useEffect, useState} from 'react';

import EventDetails from "./EventDetails.js";
import SiteSelector from "../sites/SiteSelector.js";
import { Popup, PopupWarning } from "../../components/Popup.js";
import { postData } from "../../BackendAccessor.js";
import { userContext } from "../UserContext";

export default function EventPopup({show, onHide, onChange, year, season, events, selectedEvent}) {
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);
    const [siteId, setSiteId] = useState(undefined);

    const [numVolunteers, setNumVolunteers] = useState(null);
    const [numTrashBags, setNumTrashBags] = useState(null);
    const [walkingDistance, setWalkingDistance] = useState(null);
    const [trashWeight, setTrashWeight] = useState(null);

    const {userState} = useContext(userContext);
    const [warning, setWarning] = useState("");

    const onSubmit = (isDone) => {
        console.log("onSubmit");
        if (selectedEvent) {
            updateEvent().then(() => {
                onChange();
            });
            if (isDone) {
                onClose();
            }
        }
        else {
            addEvent().then((isSuccessful) => {
                console.log("Add Event isSuccessful", isSuccessful);
                if (isSuccessful) {
                    onChange();
                    if (isDone) {
                        onClose();
                    }
                }
                setSiteId(undefined);
                clearEventDetails();
            });
        }
    };

    const onClose = () => {
        console.log("EventPopup onClose");
        clearEventDetails();
        onHide();
    };

    const clearEventDetails = () => {
        setNumVolunteers(null);
        setNumTrashBags(null);
        setWalkingDistance(null);
        setTrashWeight(null);
    };

    const addEvent = () => {
        const existingEvent = events.find(event => event["site_id"].toString() === siteId.toString());
        console.log("AddEvent", existingEvent, siteId);
        if (existingEvent) {
            setWarning("Site already exists for the given season and year.");
            return Promise.resolve(false);
        }
        else {
            const request = generateEventDetailsObj();
            return postData('events/add', request, userState.token)
                .then((response) => {
                    return response.json();
                });
        }
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
            "walking_distance": walkingDistance,
            "trash_weight": trashWeight,
        };
    }

    useEffect(() => {
        if (selectedEvent) {
            console.log("EventPopup::useEffect selectedEvent", selectedEvent);
            setSiteId(selectedEvent.site_id);
            setNumVolunteers(selectedEvent.volunteer_cnt);
            setNumTrashBags(selectedEvent.trashbag_cnt);
            setWalkingDistance(selectedEvent.walking_distance);
            setTrashWeight(selectedEvent.trash_weight);
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
                && selectedEvent.walking_distance === walkingDistance
                && selectedEvent.trash_weight === trashWeight);
        }
    }, [selectedEvent, numVolunteers, numTrashBags, walkingDistance, trashWeight]);

    return(
        <div>
        <Popup
            show={show}
            onHide={onClose}
            title={(selectedEvent ? "Update" : "Add") + " Event for " + year + " " + season}
            body={
                <div>
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
                        walkingDistance={walkingDistance}
                        setWalkingDistance={setWalkingDistance}
                        trashWeight={trashWeight}
                        setTrashWeight={setTrashWeight}/>
                </div>
            }
            submitDisabled={submitDisabled}
            submitText={selectedEvent ? "Update": "Add"}
            showAddAnother={!selectedEvent}
            onSubmit={onSubmit}
        />
        <PopupWarning
            show={show && !!warning}
            warning={warning}
            onHide={() => {setWarning("");}}
        />
        </div>
    );
} 

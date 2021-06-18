import React, {useContext, useEffect, useState} from 'react';

import "./EventItemPopup.css";

import ItemSelector from "../items/ItemSelector";
import { Popup, PopupWarning } from "../../components/Popup";
import PositiveIntegerInput from "../../components/PositiveIntegerInput";
import { postData } from "../../BackendAccessor";
import { userContext } from "../UserContext";

export default function EventItemPopup({show, onHide, onChange, year, season, eventItems, event, selectedEventItem}) {
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [itemId, setItemId] = useState(undefined);
    const [quantity, setQuantity] = useState(null);

    const {userState} = useContext(userContext);
    const [warning, setWarning] = useState("");

    const onSubmit = (isDone) => {
        console.log("onSubmit");
        if (selectedEventItem) {
            updateEventItem().then(() => {
                onChange();
            });
            if (isDone) {
                onClose();
            }
        }
        else {
            addEventItem()
            .then((isSuccessful) => {
                if (isSuccessful) {
                    onChange();
                    if (isDone) {
                        onClose();
                    }
                }
            });
            setItemId(undefined);
            setQuantity(null);
        }
    };

    const onClose = () => {
        setQuantity(null);
        onHide();
    };

    const addEventItem = () => {
        const existingEventItem = eventItems.find(eventItem => eventItem["item_id"].toString() === itemId.toString());
        console.log("AddEventItem", itemId, existingEventItem);
        if (existingEventItem) {
            setWarning("Item already added to this event.");
            return Promise.resolve(false);
        }
        else {
            const request = generateEventItemObj();
            return postData('event-items/add', request, userState.token)
                .then((response) => {
                    return response.json();
                });
        }
    }

    const updateEventItem = () => {
        const request = generateEventItemObj();
        request["record_id"] = selectedEventItem.record_id;
        return postData('event-items/update', request, userState.token)
            .then((response) => {
                return response.json();
            });
    };

    const generateEventItemObj = () => {
        return {
            "updated_by": userState.name,
            "event_id": event.event_id,
            "item_id": itemId,
            "quantity": quantity
        };
    }

    useEffect(() => {
        if (selectedEventItem) {
            console.log("EventItemPopup::useEffect selectedEventItem", selectedEventItem);
            setItemId(selectedEventItem.item_id);
            setQuantity(selectedEventItem.quantity);
        }
    }, [selectedEventItem]);

    useEffect(() => {
        if (selectedEventItem) {
            console.log("EventItemPopup::useEffect selectedEventItem", selectedEventItem);
            setSubmitDisabled(selectedEventItem.quantity === quantity);
        }
        else {
            const isDisabled = (!itemId || !quantity);
            console.log("EventItemPopup::set disabled", isDisabled);
            setSubmitDisabled(isDisabled);
        }
    }, [selectedEventItem, itemId, quantity, show]);

    return(
        <div>
        <Popup
            show={show}
            onHide={onClose}
            title={(selectedEventItem ? "Update" : "Add")
                    + " Item for " + year + " " + season
                    + " at " + event?.site_name}
            body={
                <div>
                    <ItemSelector
                        isDisabled={!!selectedEventItem}
                        itemId={itemId}
                        setItemId={setItemId}
                    />
                    <PositiveIntegerInput
                        name="Quantity*"
                        placeholder="Number of Items"
                        value={quantity}
                        onChanged={setQuantity}
                    />
                </div>
            }
            submitDisabled={submitDisabled}
            submitText={selectedEventItem ? "Update": "Add"}
            showAddAnother={!selectedEventItem}
            defaultAddAnother
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

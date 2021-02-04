import { getData, postData } from "../../BackendAccessor.js";

export function getEventItems(event_id) {
    return getData("event-items?event_id=" + event_id) 
    .then((results) => {
        return results.json().then((response) => {
            return response.event_items;
        });
    })
    .catch(() => {
        console.log("Failed to retrieve event items for event id: " + event_id);
    });
}

export function deleteEventItem(record_id) {
    const request = {
        "record_id": record_id
    };
    return postData('event-items/remove', request)
        .then((response) => {
            return response.json();
        });
}

import { getData } from "../../BackendAccessor.js";

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
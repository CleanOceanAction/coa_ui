import { getData, postData } from "../../BackendAccessor.js";

export function getEvents(year, season) {
    return getData("events?volunteer_year=" + year + "&volunteer_season=" + season) 
    .then((results) => {
        return results.json().then((response) => {
            return response.events;
        });
    })
    .catch(() => {
        console.log("Failed to retrieve events for year & season.", year, season);
    });
}

export function deleteEvent(event_id) {
    const request = {
        "event_id": event_id
    };
    postData('events/remove', request)
        .then((response) => {
            response.json().then(() => {
                console.log("Event deleted.", event_id);
            });
        });
}
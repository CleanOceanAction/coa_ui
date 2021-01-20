import { getData } from "../../BackendAccessor.js";

export function getItems() {
    return getData("items") 
    .then((results) => {
        return results.json().then((response) => {
            return response.items;
        });
    })
    .catch(() => {
        console.log("Failed to retrieve items.");
    });
}

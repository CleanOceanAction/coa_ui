import { getData, postData } from "../../BackendAccessor.js";

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

export function deleteItem(item_id) {
    const request = {
        "item_id": item_id
    };
    return postData('items/remove', request)
        .then((response) => {
            return response.json();
        });
}

import { getData } from "../../BackendAccessor.js";

export function getSites() {
    return getData("sites") 
    .then((results) => {
        return results.json().then((response) => {
            return response.sites;
        });
    })
    .catch(() => {
        console.log("Failed to retrieve sites.");
    });
}

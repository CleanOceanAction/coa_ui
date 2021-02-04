import { getData, postData } from "../../BackendAccessor.js";

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

export function deleteSite(site_id) {
    const request = {
        "site_id": site_id
    };
    return postData('sites/remove', request)
        .then((response) => {
            return response.json();
        });
}

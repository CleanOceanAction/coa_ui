import React, {useContext, useEffect, useState} from 'react';

import SelectCustom from "../../components/SelectCustom";
import { Popup, PopupWarning } from "../../components/Popup";
import FloatInput from "../../components/FloatInput";
import ZipCodeInput from "../../components/ZipCodeInput";
import { postData } from "../../BackendAccessor";
import { userContext } from "../UserContext";

export default function SitePopup({
        show, onHide, onChange, sites, selectedSite
    }) {
    const [county, setCounty] = useState("");
    const [town, setTown] = useState("");
    const [siteName, setSiteName] = useState("");
    const [street, setStreet] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);

    const {userState} = useContext(userContext);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [warning, setWarning] = useState("");

    const onSubmit = (isDone) => {
        console.log("onSubmit");
        
        const existingSite = sites.find(item => 
            item["county"] === county
            && item["town"] === town
            && item["site_name"] === siteName);
        if (existingSite) {
            setWarning("Site already exists.");
            return;
        }

        if (selectedSite) {
            updateSite().then(() => {
                onChange();
            });
        }
        else {
            addSite()
            .then(() => {
                onChange();
            });
            clearValues();
        }
        if (isDone) {
            onClose();
        }
    };

    const clearValues = () => {
        setCounty("");
        setTown("");
        setSiteName("");
    }

    const onClose = () => {
        clearValues();
        onHide();
    };

    const addSite = () => {
        console.log("AddSite");
        const request = generateObj();
        return postData("sites/add", request, userState.token)
            .then((response) => {
                return response.json();
            });
    }

    const updateSite = () => {
        console.log("Update Site");
        const request = generateObj();
        request["site_id"] = selectedSite["site_id"];
        return postData("sites/update", request, userState.token)
            .then((response) => {
                return response.json();
            });
    };

    const generateObj = () => {
        const obj = {
            "state": "NJ",
            "county": county,
            "town": town,
            "site_name": siteName,
            "street": street,
            "zipcode": zipcode,
            "lat": lat,
            "long": long
        }
        return obj;
    }

    useEffect(() => {
        console.log("CustomPopup::useEffect selectedSite", selectedSite);
        if (selectedSite) {
            setCounty(selectedSite["county"]);
            setTown(selectedSite["town"]);
            setSiteName(selectedSite["site_name"]);
        }
        else {
            setCounty("");
            setTown("");
            setSiteName("");
        }
    }, [selectedSite]);

    useEffect(() => {
        console.log("CustomPopup::useEffect selectedSite", selectedSite);
        if (selectedSite) {
            setSubmitDisabled(
                selectedSite["county"] === county
                && selectedSite["town"] === town
                && selectedSite["site_name"] === siteName
                && selectedSite["street"] === street
                && selectedSite["zipcode"] === zipcode
                && selectedSite["lat"] === lat
                && selectedSite["long"] === long);
        }
        else {
            setSubmitDisabled(!county || !town || !siteName);
        }
    }, [selectedSite, county, town, siteName, street, zipcode, lat, long]);

    return(
        <div>
        <Popup
            show={show}
            onHide={onClose}
            title={(selectedSite ? "Update" : "Add")
                    + " Site "}
            body={
                <div>
                    County
                    <SelectCustom
                        optionList={sites}
                        property={"county"}
                        value={county}
                        setValue={setCounty}
                    />
                    Town
                    <SelectCustom
                        optionList={sites}
                        property={"town"}
                        value={town}
                        setValue={setTown}
                    />
                    Site Name
                    <SelectCustom
                        optionList={sites}
                        property={"site_name"}
                        value={siteName}
                        setValue={setSiteName}
                    />
                    Street<br/>
                    <input
                        name="street"
                        type="text"
                        value={street}
                        placeholder="Street Address"
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    <ZipCodeInput
                        name="Zip Code"
                        placeholder="Zip Code"
                        value={zipcode}
                        onChanged={setZipcode}
                    />
                    <FloatInput
                        name="Latitude"
                        placeholder="latitude"
                        value={lat}
                        onChanged={setLat}
                    />
                    <FloatInput
                        name="Longitude"
                        placeholder="longitude"
                        value={long}
                        onChanged={setLong}
                    />
                </div>
            }
            submitText={selectedSite ? "Update": "Add"}
            submitDisabled={submitDisabled}
            showAddAnother={!selectedSite}
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

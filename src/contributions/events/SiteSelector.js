import './SiteSelector.css';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import { getData } from "../../BackendAccessor.js";

const sortByLabel = (lhs, rhs) => {
    const LHS = lhs.label.toUpperCase();
    const RHS = rhs.label.toUpperCase();
    return (LHS < RHS) ? -1 : ((LHS > RHS) ? 1 : 0);
};

export default function SiteSelector({isDisabled, selectedSite, setSiteId}) {
    const [location, setLocation] = useState({
        "county": {"value": selectedSite?.county, "label": selectedSite?.county},
        "town": {"value": selectedSite?.town, "label": selectedSite?.town},
        "site": {"value": selectedSite?.site_name, "label": selectedSite?.site_name}
    });
    const [countyOptions, setCountyOptions] = useState([]);
    const [townOptions, setTownOptions] = useState([]);
    const [siteOptions, setSiteOptions] = useState([]);
    const [allSites, setAllSites] = useState([]);
    
    const setCounty = (countySelection) => {
        console.log("setCounty", countySelection);
        setLocation({
            "county": countySelection,
            "town": {},
            "site": {}
        });
    };
    
    const setTown = (townSelection) => {
        console.log("townSelection", townSelection);
        if (townSelection) {
            const county = townSelection.value.split("|")[0];
            setLocation({
                "county": {value: county, label: county},
                "town": townSelection,
                "site": {}
            })
        }
        else {
            setLocation({
                "county": location.county,
                "town": {},
                "site": {}
            })
        }
    };

    const setSite = (siteSelection) => {
        console.log("siteSelection", siteSelection);
        if (siteSelection) {
            const siteSplit = siteSelection.value.split("|");
            const county = siteSplit[0];
            const town = siteSplit[1];
            const siteId = siteSplit[3];
            setLocation({
                "county": {value: county, label: county},
                "town": {value: town, label: town},
                "site": siteSelection,
                "siteId": siteId
            })
        }
        else {
            setLocation({
                "county": location.county,
                "town": location.town,
                "site": {}
            })
        }
    }

    useEffect(() => {
        const updateCountyOptions = (sites) => {
            const countySet = new Set();
            sites.forEach((site) => countySet.add(site.county));
            setCountyOptions(Array.from(countySet).sort().map(
                county => { return {"value": county, "label": county}; }));
        };

        const updateTownAndSiteOptions = (sites) => {
            const townSet = new Set();
            const siteSet = new Set();
            sites.forEach((site) => {
                if (!location.county?.label || site.county === location.county.label) {
                    const townValue = site.county + "|" + site.town;
                    townSet.add(townValue);
                    if (!location.town?.label || site.town === location.town.label) {
                        siteSet.add(townValue + "|" + site.site_name + "|" + site.site_id);
                    }
                }
            });
            let townSelections = Array.from(townSet).map(townValue => {
                return {"value": townValue, "label": townValue.split("|")[1]};
            }).sort(sortByLabel);
            setTownOptions(townSelections);

            let siteSelections = Array.from(siteSet).map(siteValue => {
                return {"value": siteValue, "label": siteValue.split("|")[2]};
            }).sort(sortByLabel);
            setSiteOptions(siteSelections);
        };

        
        console.log("in use effect");
        if (isDisabled) {
            return;
        }

        if (allSites.length === 0) {
            console.log("all sites empty");
            getData("sites")
            .then((results) => {
                results.json().then((response) => {
                    console.log("sites", response);
                    setAllSites(response.sites);
                    updateCountyOptions(response.sites);
                });
            })
            .catch(() => {
                console.log("Failed to execute query for events");
            });
        }
        else {
            console.log("updating location options");
            updateTownAndSiteOptions(allSites);
            setSiteId(location.siteId);
        }
    }, [allSites, location, isDisabled, setSiteId]);

    return(
        <div className="locationSelection">
            County*<Select
                bsStyle="default"
                className="select"
                isClearable
                isDisabled={isDisabled}
                value={location.county}
                options={countyOptions}
                onChange={(selection) => setCounty(selection)}>
            </Select>
            Town*<Select
                bsStyle="default"
                className="select"
                isClearable
                isDisabled={isDisabled}
                value={location.town}
                options={townOptions}
                onChange={(selection) => setTown(selection)}>
            </Select>
            Site*<Select
                bsStyle="default"
                className="select"
                isClearable
                isDisabled={isDisabled}
                value={location.site}
                options={siteOptions}
                onChange={(selection) => setSite(selection)}>
            </Select>
        </div>
    );
}
  
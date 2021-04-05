import "./Sites.css";

import React, { useCallback, useEffect, useState } from "react";
import DataGrid from "../../components/DataGrid";
import SitePopup from "./SitePopup"
import { Popup, PopupWarning } from "../../components/Popup"
import { getSites, deleteSite } from "./SiteAccessor";

const SITE_COLUMNS = [
    { name: "site_id", title: "Site Id" },
    { name: "county", title: "County" },
    { name: "town", title: "Town" },
    { name: "site_name", title: "Site" },
    { name: "street", title: "Street" },
    { name: "zipcode", title: "ZIP Code" },
    { name: "lat", title: "Latitude" },
    { name: "long", title: "Longitude" }
];

const DEFAULT_SORTING = [
    { columnName: "county", direction: "asc" },
    { columnName: "town", direction: "asc" },
    { columnName: "site_name", direction: "asc" },
];

const COLUMN_EXTENSIONS = [
    { columnName: "county", width: 110 },
    { columnName: "zipcode", width: 105 },
];

export default function Sites() {
    const [sites, setSites] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSite, setSelectedSite] = useState(undefined);
    const [siteToDelete, setSiteToDelete] = useState(undefined);
    const [warning, setWarning] = useState("");

    const refreshSites = useCallback(
        () => {
            getSites()
            .then((sites) => {
                setSites(sites);
            });
        }, []
    );

    useEffect(() => {
        refreshSites();
    }, [refreshSites]);

    const onAddClicked = () => {
        console.log("Add site clicked.");
        setShowPopup(true);
    };

    const onEditClicked = (site_id) => {
        console.log("Edit site clicked.", site_id);
        const site = sites.find(site => site.site_id === site_id);
        if (site) {
            setSelectedSite(site);
            setShowPopup(true);
        }
    };

    const onDeleteClicked = (site_id) => {
        console.log("Delete site clicked.", site_id);
        const site = sites.find(site => site.site_id === site_id);
        setSiteToDelete(site);
    };

    const onDeleteConfirmed = () => {
        deleteSite(siteToDelete.site_id).then(() => {
            console.log("On delete success: refreshing sites page.");
            refreshSites();
        }).catch(() => {
            console.log("On delete failed.");
            setWarning("Deleting this site failed. This can happen if events still refer to it.");
        });
        setSiteToDelete(undefined);
    }

    return(
        <div>
            <DataGrid
                columns={SITE_COLUMNS}
                rows={sites}
                rowIdPropertyName="site_id"
                columnExtensions={COLUMN_EXTENSIONS}
                defaultSorting={DEFAULT_SORTING}
                onAddClicked={onAddClicked}
                onEditClicked={onEditClicked}
                onDeleteClicked={onDeleteClicked}
            />
            <SitePopup
                show={showPopup}
                sites={sites}
                selectedSite={selectedSite}
                onHide={() => {setShowPopup(false); setSelectedSite(undefined);}}
                onChange={refreshSites}
            />
            <Popup
                show={!!siteToDelete}
                title="Delete Confirmation"
                body={"Are you sure you want to delete "
                        + siteToDelete?.site_name + "?"}
                onHide={() => {setSiteToDelete(undefined);}}
                onSubmit={onDeleteConfirmed}
                submitText="Yes"
            />
            <PopupWarning
                show={!!warning}
                warning={warning}
                onHide={() => {setWarning("");}}
            />
        </div>
    );
}

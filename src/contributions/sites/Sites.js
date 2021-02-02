import './Sites.css';

import React, { useCallback, useEffect, useState } from 'react';
import DataGrid from "../../components/DataGrid";
import Popup from "../../components/Popup";
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
    const [siteToDelete, setSiteToDelete] = useState(undefined);

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

    const onDeleteClicked = (site_id) => {
        console.log("Delete site clicked.", site_id);
        const site = sites.find(site => site.site_id === site_id);
        setSiteToDelete(site);
    };

    const onDeleteConfirmed = () => {
        deleteSite(siteToDelete.site_id).then(() => {
            console.log("On delete success: refreshing sites page.");
            refreshSites();
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
                //onAddClicked={onAddClicked}
                //onEditClicked={onEditClicked}
                onDeleteClicked={onDeleteClicked}
            />
            <Popup
                show={!!siteToDelete}
                title="Delete Confirmation"
                body={"Are you sure you want to delete "
                        + siteToDelete?.item_name + "?"}
                onHide={() => {setSiteToDelete(undefined);}}
                onSubmit={onDeleteConfirmed}
                submitText="Yes"
            />
        </div>
    );
}

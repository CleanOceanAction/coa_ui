import './Sites.css';

import React, { useState, useEffect } from 'react';
import DataGrid from "../../components/DataGrid";
import { getSites } from "./SiteAccessor.js";

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

    useEffect(() => {
        getSites()
        .then((sites) => {
            setSites(sites);
        });
    },[]);

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
                //onDeleteClicked={onDeleteClicked}
            />
        </div>
    );
}

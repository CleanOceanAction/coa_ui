import './EventItems.css';

import React, { useState, useEffect } from 'react';
import DataGrid from "../../components/DataGrid";
import { getEventItems } from "./EventItemsAccessor.js";

const ITEM_COLUMNS = [
    { name: "record_id", title: "Record Id" },
    { name: "event_id", title: "Event Id" },
    { name: "item_id", title: "Item Id" },
    { name: "material", title: "Material" },
    { name: "category", title: "Category" },
    { name: "item_name", title: "Item Name" },
    { name: "quantity", title: "Quantity" },
    { name: "updated_by", title: "Updated By" },
];

const DEFAULT_SORTING = [
    { columnName: "material", direction: "asc" },
    { columnName: "category", direction: "asc" },
    { columnName: "item_name", direction: "asc" },
];

export default function EventItems({event_id}) {
    const [eventItems, setEventItems] = useState([]);

    useEffect(() => {
        getEventItems(event_id)
        .then((itemList) => {
            setItems(itemList);
        });
    },[]);

    return(
        <div>
            <DataGrid
                columns={ITEM_COLUMNS}
                rows={items}
                rowIdPropertyName="item_id"
                defaultSorting={DEFAULT_SORTING}
            />
        </div>
    );
}

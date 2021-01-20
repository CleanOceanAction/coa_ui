import './Items.css';

import React, { useState, useEffect } from 'react';
import DataGrid from "../../components/DataGrid";
import { getItems } from "./ItemAccessor.js";

const ITEM_COLUMNS = [
    { name: "item_id", title: "Item Id" },
    { name: "material", title: "Material" },
    { name: "category", title: "Category" },
    { name: "item_name", title: "Item Name" }
];

const DEFAULT_SORTING = [
    { columnName: "material", direction: "asc" },
    { columnName: "category", direction: "asc" },
    { columnName: "item_name", direction: "asc" },
];

export default function Items() {
    const [items, setItems] = useState([]);

    const onAddClicked = () => {
        console.log("Add item clicked.");
    };

    const onEditClicked = (item_id) => {
        console.log("Edit item clicked.", item_id);
    };

    const onDeleteClicked = (item_id) => {
        console.log("Delete item clicked.", item_id);
    };

    useEffect(() => {
        getItems()
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
                //onAddClicked={onAddClicked}
                //onEditClicked={onEditClicked}
                //onDeleteClicked={onDeleteClicked}
            />
        </div>
    );
}

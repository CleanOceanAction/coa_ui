import "./Items.css";

import React, { useCallback, useEffect, useState } from "react";
import DataGrid from "../../components/DataGrid";
import ItemPopup from "./ItemPopup"
import Popup from "../../components/Popup"
import { getItems, deleteItem } from "./ItemAccessor.js";

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
    const [showPopup, setShowPopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(undefined);
    const [selectedItem, setSelectedItem] = useState(undefined);

    const onAddClicked = () => {
        console.log("Add item clicked.");
        setShowPopup(true);
    };

    const onEditClicked = (item_id) => {
        console.log("Edit item clicked.", item_id);
        const item = items.find(item => item.item_id === item_id);
        if (item) {
            setSelectedItem(item);
            setShowPopup(true);
        }
    };

    const refreshItems = useCallback(
        () => {
            getItems()
            .then((itemList) => {
                setItems(itemList);
            });
        }, []
    );

    useEffect(() => {
        refreshItems();
    }, [refreshItems]);

    const onDeleteClicked = (item_id) => {
        console.log("Delete item clicked.", item_id);
        const item = items.find(item => item.item_id === item_id);
        setItemToDelete(item);
    };

    const onDeleteConfirmed = () => {
        deleteItem(itemToDelete.item_id).then(() => {
            console.log("On delete success: refreshing items page.");
            refreshItems();
        });
        setItemToDelete(undefined);
    }

    return(
        <div>
            <DataGrid
                columns={ITEM_COLUMNS}
                rows={items}
                rowIdPropertyName="item_id"
                defaultSorting={DEFAULT_SORTING}
                onAddClicked={onAddClicked}
                onEditClicked={onEditClicked}
                onDeleteClicked={onDeleteClicked}
            />
            <ItemPopup
                show={showPopup}
                items={items}
                selectedItem={selectedItem}
                onHide={() => {setShowPopup(false); setSelectedItem(undefined);}}
                onChange={refreshItems}
            />
            <Popup
                show={!!itemToDelete}
                title="Delete Confirmation"
                body={"Are you sure you want to delete "
                        + itemToDelete?.material + ": "
                        + itemToDelete?.category + " - "
                        + itemToDelete?.item_name + "?"}
                onHide={() => {setItemToDelete(undefined);}}
                onSubmit={onDeleteConfirmed}
                submitText="Yes"
            />
        </div>
    );
}

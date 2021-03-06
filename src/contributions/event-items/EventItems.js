import './EventItems.css';

import React, { useCallback, useEffect, useState } from 'react';
import DataGrid from "../../components/DataGrid";
import EventItemPopup from "./EventItemPopup"
import { getEventItems, deleteEventItem } from "./EventItemsAccessor";
import { getItems } from "../items/ItemAccessor";
import { Popup, PopupWarning } from "../../components/Popup";

const EVENT_ITEM_COLUMNS = [
    { name: "record_id", title: "Record Id" },
    { name: "event_id", title: "Event Id" },
    { name: "item_id", title: "Item Id" },
    { name: "material", title: "Material" },
    { name: "category", title: "Category" },
    { name: "item_name", title: "Item Name" },
    { name: "quantity", title: "Quantity" },
    { name: "updated_by", title: "Updated By" },
    { name: "updated_tsp", title: "Updated Time" },
];

const EVENT_ITEM_TOTALS = [
    "quantity",
];

const DEFAULT_SORTING = [
    { columnName: "updated_tsp", direction: "asc" }
];

const DEFAULT_HIDDEN_COLUMN_NAMES = [
    "record_id",
    "event_id",
    "item_id",
];

export default function EventItems({event, year, season, onReturn}) {
    const [eventItems, setEventItems] = useState([]);
    const [itemMap, setItemMap] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [selectedEventItem, setSelectedEventItem] = useState(undefined);
    const [eventItemToDelete, setEventItemToDelete] = useState(undefined);
    const [warning, setWarning] = useState("");

    const onAddClicked = () => {
        console.log("Add event item clicked.");
        setShowPopup(true);
    };

    const onEditClicked = (record_id) => {
        console.log("Edit event item clicked.", record_id);
        const eventItem = eventItems.find(eventItem => eventItem.record_id === record_id);
        if (eventItem) {
            setSelectedEventItem(eventItem);
            setShowPopup(true);
        }
    };

    const onDeleteClicked = (record_id) => {
        console.log("Delete event item clicked.", record_id);
        const eventItem = eventItems.find(eventItem => eventItem.record_id === record_id);
        setEventItemToDelete(eventItem);
    };

    const onDeleteConfirmed = () => {
        deleteEventItem(eventItemToDelete.record_id).then(() => {
            console.log("On delete success: refreshing event items page.");
            refreshEventItems();
        }).catch(() => {
            console.log("On delete failed.");
            setWarning("Deleting this event item failed.");
        });
        setEventItemToDelete(undefined);
    }

    const refreshEventItems = useCallback(
        () => {
            if (event) {
                getEventItems(event["event_id"])
                .then((responseEventItems) => {
                    const eventItemList = [];
                    responseEventItems.forEach((eventItem) => {
                        const item = itemMap[eventItem["item_id"]];
                        const eventItemObj = {...eventItem, ...item};
                        eventItemList.push(eventItemObj);
                    });
                    setEventItems(eventItemList);
                });
            }
        }, [event, itemMap]
    );

    const refreshItemMap = useCallback(
        () => {
            getItems()
            .then((items) => {
                if (items) {
                    const itemsObj = {};
                    items.forEach((item) => {
                        itemsObj[item["item_id"]] = item;
                    });
                    setItemMap(itemsObj);
                }
            });
        }, []
    );

    useEffect(() => {
        if (Object.keys(itemMap).length === 0) {
            refreshItemMap();
        }
        else {
            refreshEventItems();
        }
        
    }, [event, itemMap, refreshEventItems, refreshItemMap]);

    return(
        <div>
            <button
                onClick={onReturn}>
                Return
            </button>
            <h1>{year} {season} Items for {event["site_name"]}</h1>
            <DataGrid
                columns={EVENT_ITEM_COLUMNS}
                rows={eventItems}
                rowIdPropertyName="record_id"
                defaultHiddenColumnNames={DEFAULT_HIDDEN_COLUMN_NAMES}
                defaultSorting={DEFAULT_SORTING}
                onAddClicked={onAddClicked}
                onEditClicked={onEditClicked}
                onDeleteClicked={onDeleteClicked}
                totals={EVENT_ITEM_TOTALS}
            />
            <EventItemPopup
                year={year}
                season={season}
                show={showPopup}
                eventItems={eventItems}
                event={event}
                selectedEventItem={selectedEventItem}
                onHide={() => {setShowPopup(false); setSelectedEventItem(undefined);}}
                onChange={refreshItemMap}
            />
            <Popup
                show={!!eventItemToDelete}
                title="Delete Confirmation"
                body={"Are you sure you want to delete the entry for "
                        + eventItemToDelete?.item_name +
                        " with a count of " + eventItemToDelete?.quantity + "?"}
                onHide={() => {setEventItemToDelete(undefined);}}
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

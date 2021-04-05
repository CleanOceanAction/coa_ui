import './Events.css';

import React, { useCallback, useEffect, useState } from 'react';

import DataGrid from "../../components/DataGrid";
import EventPopup from "./EventPopup";
import EventItems from "../event-items/EventItems";
import Popup from "../../components/Popup";
import { getEvents, deleteEvent } from "./EventAccessor";
import { getSites } from "../sites/SiteAccessor";


const EVENT_COLUMNS = [
    { name: "event_id", title: "Event Id" },
    { name: "county", title: "County" },
    { name: "town", title: "Town" },
    { name: "site_name", title: "Site" },
    { name: "trash_items_cnt", title: "# of Items" },
    { name: "volunteer_cnt", title: "# of Volunteers" },
    { name: "trashbag_cnt", title: "# of Trashbags" },
    { name: "walking_distance", title: "Est. Distance (mi)" },
    { name: "trash_weight", title: "Trash Wgt (lbs)" },
    { name: "updated_by", title: "Updated By" },
    { name: "updated_tsp", title: "Updated Time" },
];

const EVENT_TOTALS = [
    "trash_items_cnt",
    "volunteer_cnt",
    "trashbag_cnt",
    "walking_distance",
    "trash_weight",
];

const COLUMN_EXTENSIONS = [
    { columnName: "county", width: 110 },
    { columnName: "town", width: 180 },
    { columnName: "volunteer_cnt", width: 140 },
    { columnName: "trashbag_cnt", width: 135 },
    { columnName: "walking_distance", width: 155 },
    { columnName: "trash_weight", width: 140 },
];

const DEFAULT_SORTING = [
    { columnName: 'county', direction: 'asc'}
];

export default function Events() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [season, setSeason] = useState(new Date().getMonth() > 5 ? "Fall" : "Spring");
    const [siteMap, setSiteMap] = useState({});
    const [events, setEvents] = useState([]);
    const [eventToDelete, setEventToDelete] = useState(undefined);
    const [selectedEditEvent, setSelectedEditEvent] = useState(undefined);
    const [selectedDrillDownEvent, setSelectedDrillDownEvent] = useState(undefined);
    const [showPopup, setShowPopup] = useState(false);

    const onAddClicked = () => {
        console.log("Add event clicked.");
        setShowPopup(true);
    };

    const onEditClicked = (event_id) => {
        console.log("Edit event clicked.", event_id);
        const event = events.find(event => event.event_id === event_id);
        if (event) {
            setSelectedEditEvent(event);
            setShowPopup(true);
        }
    };

    const onDeleteClicked = (event_id) => {
        console.log("Delete event clicked.", event_id);
        const event = events.find(event => event.event_id === event_id);
        setEventToDelete(event);
    };

    const onDeleteConfirmed = () => {
        deleteEvent(eventToDelete.event_id).then(() => {
            console.log("On delete success: refreshing events page.");
            refreshEvents();
        });
        setEventToDelete(undefined);
    }

    const onRowSelected = (event_id) => {
        console.log("Row selected.", event_id);
        const event = events.find(event => event.event_id === event_id);
        setSelectedDrillDownEvent(event);
    };

    const refreshEvents = useCallback(
        () => {
            getEvents(year, season)
            .then((responseEvents) => {
                const eventList = [];
                responseEvents.forEach((event) => {
                    const site = siteMap[event["site_id"]];
                    const eventObj = {...site, ...event};
                    eventList.push(eventObj);
                });
                setEvents(eventList);
            });
        }, [year, season, siteMap]
    );

    useEffect(() => {
        console.log(year, season);
        if (Object.keys(siteMap).length === 0) {
            getSites()
            .then((sites) => {
                if (sites) {
                    const sitesObj = {};
                    sites.forEach((site) => {
                        sitesObj[site["site_id"]] = site;
                    });
                    setSiteMap(sitesObj);
                }
            });
        }
        else {
            refreshEvents();
        }
        
    }, [year, season, siteMap, refreshEvents]);

    return(
        <div>
            {!selectedDrillDownEvent
            ?
            <div>
                <div id="selectionRow">
                    <div>Year</div>
                    <input
                        name="year"
                        type="number"
                        min="1900"
                        max="9999"
                        step="1"
                        placeholder="Year"
                        value={year}
                        onChange={(event) => setYear(event.target.value)}
                        required
                    />
                    <div>Season</div>
                    <select
                        value={season}
                        onChange={(event) => setSeason(event.target.value)}>
                        <option value="Spring">Spring</option>
                        <option value="Fall">Fall</option>
                    </select>
                </div>
                <br/>
                <DataGrid
                    rows={events}
                    columns={EVENT_COLUMNS}
                    columnExtensions={COLUMN_EXTENSIONS}
                    rowIdPropertyName="event_id"
                    defaultSorting={DEFAULT_SORTING}
                    onAddClicked={onAddClicked}
                    onEditClicked={onEditClicked}
                    onDeleteClicked={onDeleteClicked}
                    onRowSelected={onRowSelected}
                    totals={EVENT_TOTALS}
                />
                <EventPopup
                    year={year}
                    season={season}
                    show={showPopup}
                    events={events}
                    selectedEvent={selectedEditEvent}
                    onHide={() => {setShowPopup(false); setSelectedEditEvent(undefined);}}
                    onChange={refreshEvents}
                />
                <Popup
                    show={!!eventToDelete}
                    title="Delete Confirmation"
                    body={"Are you sure you want to delete the event at "
                            + eventToDelete?.site_name + "?"}
                    onHide={() => {setEventToDelete(undefined);}}
                    onSubmit={onDeleteConfirmed}
                    submitText="Yes"
                />
            </div>
            :
            <div>
                <EventItems
                    year={year}
                    season={season}
                    event={selectedDrillDownEvent}
                    onReturn={() => {
                            setSelectedDrillDownEvent(undefined);
                            refreshEvents();
                    }}
                />
            </div>}
        </div>
    );
}

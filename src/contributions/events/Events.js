import './Events.css';

import React, { useState, useEffect } from 'react';

import DataGrid from "../../components/DataGrid";
import EventAdd from "./EventAdd";
import { getEvents, deleteEvent } from "./EventAccessor.js";
import { getSites } from "../sites/SiteAccessor.js";


const EVENT_COLUMNS = [
    { name: "event_id", title: "Event Id" },
    { name: "county", title: "County" },
    { name: "town", title: "Town" },
    { name: "site_name", title: "Site" },
    { name: "volunteer_cnt", title: "# of Volunteers" },
    { name: "trashbag_cnt", title: "# of Trashbags" },
    { name: "trash_weight", title: "Trash Wgt (lbs)" },
    { name: "walking_distance", title: "Est. Distance (mi)" }
];

const COLUMN_EXTENSIONS = [
    { columnName: "county", width: 110 },
    { columnName: "town", width: 180 },
    { columnName: "volunteer_cnt", width: 140 },
    { columnName: "trashbag_cnt", width: 135 },
    { columnName: "trash_weight", width: 140 },
    { columnName: "walking_distance", width: 155 }
];

const DEFAULT_SORTING = [
    { columnName: 'county', direction: 'asc'}
];

export default function Events() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [season, setSeason] = useState(new Date().getMonth() > 5 ? "Fall" : "Spring");
    const [siteMap, setSiteMap] = useState({});
    const [events, setEvents] = useState([]);
    const [eventsMap, setEventsMap] = useState({});

    const [selectedEvent, setSelectedEvent] = useState(undefined);

    const onEditEventClose = () => {
        setSelectedEvent(undefined);
    }

    const onAddClicked = () => {
        console.log("Add event clicked.");
    };

    const onEditClicked = (event_id) => {
        console.log("Edit event clicked.", event_id);
        const event = eventsMap[event_id];
        setSelectedEvent(event);
    };

    const onDeleteClicked = (event_id) => {
        console.log("Delete event clicked.", event_id);
        deleteEvent(event_id);
    };

    const onRowSelected = (event_id) => {
        console.log("Row selected.", event_id);
    };

    useEffect(() => {
        console.log(year, season);
        const updateEvents = () => {
            getEvents(year, season)
            .then((responseEvents) => {
                console.log("events response", responseEvents);
                const eventList = [];
                const eventsObj = {};
                responseEvents.forEach((event) => {
                    const site = siteMap[event["site_id"]];
                    const eventObj = {...site, ...event};
                    eventList.push(eventObj);
                    eventsObj[event.event_id] = eventObj;
                });
                setEvents(eventList);
                setEventsMap(eventsObj);
            });
        }
        if (Object.keys(siteMap).length === 0) {
            getSites()
            .then((sites) => {
                const sitesObj = {};
                sites.forEach((site) => {
                    sitesObj[site["site_id"]] = site;
                });
                setSiteMap(sitesObj);
            });
        }
        else {
            updateEvents();
        }
        
    }, [year, season, siteMap]);

    return(
        <div>
            Year<br/>
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
            /><br/>
            Season<br/>
            <select
                value={season}
                onChange={(event) => setSeason(event.target.value)}>
                <option value="Spring">Spring</option>
                <option value="Fall">Fall</option>
            </select><br/>
            <EventAdd
                event={selectedEvent}
                year={year}
                season={season}
                onClose={onEditEventClose}
            /><br/><br/>
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
            />
        </div>
    );
}

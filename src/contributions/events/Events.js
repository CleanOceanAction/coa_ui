import './Events.css';

import React, { useState, useEffect } from 'react';

import { getData } from "../../BackendAccessor.js";
import EventAdd from "./EventAdd";

import {
    EditingState,
    FilteringState,
    IntegratedFiltering,
    IntegratedSorting,
    SortingState,
    TableColumnVisibility,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableEditRow,
    TableEditColumn,
    TableHeaderRow,
    TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap3';

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

export default function Events() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [season, setSeason] = useState(new Date().getMonth() > 5 ? "Fall" : "Spring");
    const [siteMap, setSiteMap] = useState({});
    const [events, setEvents] = useState([]);
    const [eventsMap, setEventsMap] = useState({});

    const [editingRowIds] = useState([]);
    const [defaultHiddenColumnNames] = useState("event_id");
    const [selectedEvent, setSelectedEvent] = useState(undefined);

    const getRowId = (row) => row.event_id;

    const setEditingRowIds = (rowIds) => {
        console.log("editingRowIds", rowIds);
        const event = eventsMap[rowIds[0]];
        setSelectedEvent(event);
    };

    const onEditEventClose = () => {
        setSelectedEvent(undefined);
    }

    const commitChanges = ({added, updated, deleted}) => {
        console.log("commitChanges", added, updated, deleted);
        let updatedEvents;
        if (deleted.length !== 0) {
            const deletedSet = new Set(deleted);
            console.log("found events to delete", deletedSet);
            updatedEvents = events.filter(event => !deletedSet.has(event.event_id));
            deletedSet.forEach((deletedEvent) => {
                console.log("Deleting event:", deletedEvent);
            });
            setEvents(updatedEvents);
        }
    };

    useEffect(() => {
        console.log(year, season);
        const updateEvents = () => {
            getData("events?volunteer_year=" + year + "&volunteer_season=" + season) 
            .then((results) => {
                results.json().then((response) => {
                    console.log("events response", response);
                    const eventList = [];
                    const eventsObj = {};
                    response.events.forEach((event) => {
                        const site = siteMap[event["site_id"]];
                        const eventObj = {...site, ...event};
                        eventList.push(eventObj);
                        eventsObj[event.event_id] = eventObj;
                    });
                    setEvents(eventList);
                    setEventsMap(eventsObj);
                });
            })
            .catch(() => {
                console.log("Failed to execute query for events");
            });
        }
        if (Object.keys(siteMap).length === 0) {
            getData("sites")
            .then((results) => {
                results.json().then((response) => {
                    const sitesObj = {};
                    response.sites.forEach((site) => {
                        sitesObj[site["site_id"]] = site;
                    });
                    setSiteMap(sitesObj);
                });
            })
            .catch(() => {
                console.log("Failed to execute query for sites");
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
                onClose={onEditEventClose}
            /><br/><br/>
            <Grid
                rows={events}
                columns={EVENT_COLUMNS}
                getRowId={getRowId}
            >
                <FilteringState defaultFilters={[]} />
                <IntegratedFiltering />
                <EditingState
                    editingRowIds={editingRowIds}
                    onEditingRowIdsChange={setEditingRowIds}
                    onCommitChanges={commitChanges}
                />
                <SortingState
                    defaultSorting={[{ columnName: 'county', direction: 'asc'}]}
                />
                <IntegratedSorting />
                <Table columnExtensions={COLUMN_EXTENSIONS} />
                <TableColumnVisibility
                    defaultHiddenColumnNames={defaultHiddenColumnNames}
                />
                <TableHeaderRow showSortingControls />
                <TableFilterRow />
                <TableEditRow />
                <TableEditColumn
                    showEditCommand
                    showDeleteCommand
                />
            </Grid>
        </div>
    );
}
  
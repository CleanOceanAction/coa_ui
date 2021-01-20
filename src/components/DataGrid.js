import "./DataGrid.css";

import React, { useState } from 'react';

import {
    EditingState,
    FilteringState,
    IntegratedFiltering,
    IntegratedSelection,
    IntegratedSorting,
    SelectionState,
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
    TableSelection,
} from '@devexpress/dx-react-grid-bootstrap3';

export default function DataGrid({
    columns, columnExtensions, rows, rowIdPropertyName,
    defaultSorting,
    onAddClicked, onEditClicked, onDeleteClicked, onRowSelected}) {

    const [addedRows, setAddedRows] = useState([]);
    const [editingRowIds] = useState([]);
    const [selection, setSelection] = useState([]);

    const getRowId = (row) => row[rowIdPropertyName];

    const addedRowsChange = () => {
        setAddedRows([]);
        onAddClicked();
    };

    const setEditingRowIds = (rowIds) => {
        console.log("editingRowIds", rowIds);
        onEditClicked(rowIds[0]);
    };

    const commitChanges = ({added, updated, deleted}) => {
        console.log("commitChanges", added, updated, deleted);
        if (added) {
            onAddClicked();
        }
        else if (deleted.length !== 0) {
            const deletedSet = new Set(deleted);
            deletedSet.forEach((deletedEventId) => {
                console.log("Deleting event:", deletedEventId);
                onDeleteClicked(deletedEventId);
            });
        }
    };

    const selectionChanged = (selection) => {
        console.log(selection);
        const selectedId = selection[selection.length - 1];
        setSelection([selectedId]);
        if (onRowSelected) {
            onRowSelected(selectedId);
        }
    };

    return(
        <Grid
            rows={rows}
            columns={columns}
            getRowId={getRowId}
        >
            <FilteringState defaultFilters={[]} />
            <IntegratedFiltering />
            <EditingState
                addedRows={addedRows}
                onAddedRowsChange={addedRowsChange}
                editingRowIds={editingRowIds}
                onEditingRowIdsChange={setEditingRowIds}
                onCommitChanges={commitChanges}
            />
            <SortingState
                defaultSorting={defaultSorting}
            />
            {onRowSelected ? 
            <SelectionState
                selection={selection}
                onSelectionChange={selectionChanged}
            /> :null}
            {onRowSelected ? <IntegratedSelection /> : null}
            
            <IntegratedSorting />
            <Table columnExtensions={columnExtensions} />
            <TableColumnVisibility
                defaultHiddenColumnNames={rowIdPropertyName}
            />
            <TableHeaderRow showSortingControls />
            <TableFilterRow />
            <TableEditRow />
            {onAddClicked || onEditClicked || onDeleteClicked ?
            <TableEditColumn
                showAddCommand={!!onAddClicked}
                showEditCommand={!!onEditClicked}
                showDeleteCommand={!!onDeleteClicked}
            /> : null}
            {onRowSelected ? <TableSelection
                highlightRow
                selectByRowClick
                showSelectionColumn={false}
            /> : null}
        </Grid>
    );
}

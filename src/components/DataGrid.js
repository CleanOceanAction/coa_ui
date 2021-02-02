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
    defaultHiddenColumnNames, defaultSorting,
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
        if (onRowSelected) {
            onRowSelected(selectedId);
        }
        setSelection([]);
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
            <Table
                tableComponent={({ ...restProps }) => (
                    <Table.Table
                      {...restProps}
                      className={"table-striped" + (onRowSelected ? " select-style" : "")}
                    />
                )}
                columnExtensions={columnExtensions}
            />
            <TableColumnVisibility
                defaultHiddenColumnNames={defaultHiddenColumnNames ?
                    defaultHiddenColumnNames : rowIdPropertyName}
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

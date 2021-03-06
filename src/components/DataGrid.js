import "./DataGrid.css";

import React, { useState } from 'react';
import { FaPen, FaPlusSquare, FaTrash } from "react-icons/fa";

import {
    EditingState,
    FilteringState,
    IntegratedFiltering,
    IntegratedSelection,
    IntegratedSorting,
    IntegratedSummary,
    SelectionState,
    SortingState,
    SummaryState,
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
    TableSummaryRow,
} from '@devexpress/dx-react-grid-bootstrap3';

const editColumnMessages = {
    addCommand: FaPlusSquare,
    editCommand: FaPen,
    deleteCommand: FaTrash,
};

export default function DataGrid({
    columns, columnExtensions, rows, rowIdPropertyName,
    defaultHiddenColumnNames, defaultSorting,
    onAddClicked, onEditClicked, onDeleteClicked, onRowSelected, totals=[]}) {

    const [addedRows, setAddedRows] = useState([]);
    const [editingRowIds] = useState([]);
    const [selection, setSelection] = useState([]);
    const [totalSummaryItems] = useState(totals.map(col => ({ columnName: col, type: "sum" })));

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
            <SummaryState
                totalItems={totalSummaryItems}
            />

            <IntegratedFiltering />
            <IntegratedSorting />
            <IntegratedSummary />

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
                messages={editColumnMessages}
            /> : null}
            {onRowSelected ? <TableSelection
                highlightRow
                selectByRowClick
                showSelectionColumn={false}
            /> : null}
            <TableSummaryRow />
        </Grid>
    );
}

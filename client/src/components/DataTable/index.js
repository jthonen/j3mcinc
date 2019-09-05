import React from "react";
import { PropTypes } from "prop-types";
import "./style.css";

export function TableHeadColumn (props) {
    return (
        <span id={props.column.id} className={props.column.className + " table-head-column"}>
            {props.column.contents}
        </span>
    );
}

TableHeadColumn.propTypes = {
    column: PropTypes.object
};

export function TableHeadRow (props) {
    return (
        <div className="table-head-row">
            {props.columns.map((column) => {
                return (
                    <TableHeadColumn key={column.key} column={column}/>
                );
            })}
        </div>
    );
}

TableHeadRow.propTypes = {
    columns: PropTypes.array
};

export function TableDataColumn (props) {
    return (
        <span className={props.column.className + " table-data-column"} onClick={props.column.onClick}>
            {props.column.contents}
        </span>
    );
}

TableDataColumn.propTypes = {
    column: PropTypes.object
};

export function TableDataRow (props) {
    return (
        <div className="table-data-row">
            {props.columns.map((column) => {
                return (
                    <TableDataColumn key={column.key} column={column}/>
                );
            })}
        </div>
    );
}

TableDataRow.propTypes = {
    columns: PropTypes.array
};

export default function DataTable (props) {
    return (
        <div id={props.table.tableId} className="data-table">
            <TableHeadRow columns={props.table.thCols}/>
            {
                props.table.data.map((item) => {
                    if (props.table.condition(item).true === true) {
                        if (props.table.condition(item).condition) {
                            return (
                                <TableDataRow key={item._id + "-table-data-row"} columns={props.table.tdCols(item)}/>
                            );
                        }
                    } else {
                        return (
                            <TableDataRow key={item._id + "-table-data-row"} columns={props.table.tdCols(item)}/>
                        );
                    }
                })
            }
        </div>
    );
}

DataTable.propTypes = {
    table: PropTypes.object
};

import React, { Component } from 'react';
import Select from 'react-select';

import { DropdownButton, MenuItem, Panel, Grid, Row, Col } from 'react-bootstrap';


import './DateRange.css';

const defaultOptions = [
    { value: "2018-01-01", label: "Spring 2018" },
    { value: "2018-08-01", label: "Fall 2018" }
];

export class DateRangeComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            startDate: "2018-01-01",
            endDate: "2018-12-31",
            selections: []
        };

        this.props.onDateRangeChanged(this.state.startDate, this.state.endDate);
    }

    componentDidMount()
    {
        //TODO: axiom request for stuff
        this.setState({
            selections: []
        });
    }

    onMinDateChanged(selection)
    {
        console.log("onMinDateChanged" + selection.value);
        this.setState({
            startDate: selection.value
        });
        this.props.onDateRangeChanged(this.state.startDate, this.state.endDate);
    }

    onMaxDateChanged(selection)
    {
        this.setState({
            endDate: selection.value
        });
        this.props.onDateRangeChanged(this.state.startDate, this.state.endDate);
    }

    render() {
      return (
        <div className="date-range">
            <span><h4>Date Range:</h4></span>
            <span>
                <Select
                    bsStyle="default"
                    className="select"
                    defaultValue={{value: "2018-01-01", label: "Spring 2018"}}
                    options={defaultOptions}
                    onChange={this.onMinDateChanged.bind(this)}
                    >
                </Select>
            </span>
            <span><h4> - </h4></span>
            <span>
                <Select
                    bsStyle="default"
                    className="select"
                    defaultValue={{ value: "2018-08-01", label: "Fall 2018" }}
                    options={defaultOptions}
                    onChange={this.onMaxDateChanged.bind(this)}
                    >
                </Select>
            </span>
        </div>
      );

    }
}
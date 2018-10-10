import React, { Component } from "react";

import { Grid, Col } from "react-bootstrap";

import { FilterComponent } from './FilterComponent';
import { HistoricalTrendsChart } from './HistoricalTrendsChart';

import "./Trends.css";

export class Trends extends Component {
  render() {
    return (
      <Grid fluid>
        <Col xs={11}>
          <div>
            <HistoricalTrendsChart> </HistoricalTrendsChart>
          </div>
        </Col>
        <Col xs={1}>
          <div>
            <FilterComponent />
          </div>
        </Col>
      </Grid>
    );
  }
}

export default Trends;
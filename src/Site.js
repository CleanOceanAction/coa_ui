import React, { Component } from 'react';

import { Grid, Row, Col } from "react-bootstrap";

import { FilterComponent } from './FilterComponent';
import LocationDetails from "./LocationDetails";

import "./Site.css";

class Site extends Component {
  componentDidMount() {
    console.log("didmount");
      fetch(`http://coa-flask-app-dev.us-east-1.elasticbeanstalk.com/sitecategoriesbreakdown`,
            {"method": 'GET', "mode": "cors"}) 
          .then(
              function(results) {
                console.log("hello");
                results.json().then(
                  function(data) {
                    console.log(data);
                  });
              }
            , function() { console.log("failed"); });
  }
  
  render() {
    return (
      <Grid fluid>
        <Col xs={11}>
        <LocationDetails />
        </Col>
        <Col xs={1}>
          <FilterComponent />
        </Col>
      </Grid>
    );
  }
}

export default Site;
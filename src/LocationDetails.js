import React, { Component } from 'react';

import { DropdownButton, MenuItem, Panel, Grid, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

import { FilterComponent } from './FilterComponent';
import { DirtyDozenComponent } from './DirtyDozen';
import { SunburstChartComponent } from './SunburstChart';
import { LineChartComponent } from './LineChart';

import "./LocationDetails.css"
import { DateRangeComponent } from './DateRange';

const transformSiteNamesToSelectOptions =
  (data) => { return data.map((name)=>{ return {label: name, value: name}; }); };

class LocationDetails extends Component {
    
  constructor(props)
  {
    super(props);
    this.state = {
      locationOptions: [{
        label: "Sites",
        options: []
      }]
    };
  }

  componentDidMount()
  {
    //TODO: axiom request for stuff
    fetch(`http://coa-flask-app-dev.us-east-1.elasticbeanstalk.com/getsitesdropdownlist`,
            {"method": 'GET', "mode": "cors"}) 
          .then(
              function(results) {
                console.log("hello");
                results.json().then(this.updateLocationOptions.bind(this));
              }.bind(this)
            , function() { console.log("Failed to hit back-end service."); });
  }

  updateLocationOptions(data)
  {
    console.log("updateLocationOptions", data);
    this.setState({
      locationOptions: [
        {
          label: "Sites",
          options: transformSiteNamesToSelectOptions(data.site_names)
        }
      ],
      // location: {label: data.site_names[2], value: data.site_names[2]}
    });
    // TODO: remove -- this just provides a valid start-up value to populate the screen
    // need to also select the right value in the Select dropdown
    // this.handleLocationChanged({value: data.site_names[2]});
  }

    handleLocationChanged(selection, action)
    {
        console.log(selection, action);
        this.dirtyDozen.setLocation(selection.value);
    }

    handleDateRangeChanged(startDate, endDate)
    {
        console.log("handleDateRangeChanged", startDate, endDate);
        this.setState({
            "startDate": startDate,
            "endDate": endDate
        });
        //this.queryDirtyDozen(this.state.location.category, this.state.location.name, startDate, endDate);
    }

    render() {
    return (
<<<<<<< HEAD
        <div>
            <Grid fluid>
                <span>
                    <h3 className="locDetailsHeading">Location Details </h3>
                </span>
                <span>
                    <DropdownButton
                        className="locDetailsHeading"
                        bsStyle="default"
                        bsSize="large"
                        title="Site"
                        key={0}
                        id={`dropdown-basic-${0}`}>
                        <MenuItem eventKey="1">County</MenuItem>
                        <MenuItem eventKey="2">City</MenuItem>
                        <MenuItem eventKey="3" active>Site</MenuItem>
                    </DropdownButton>
                </span>
                <span>
                    <DropdownButton
                        className="locDetailsHeading"
                        bsStyle="default"
                        bsSize="large"
                        title="Sandy Hook"
                        key={0}
                        id={`dropdown-basic-${0}`}>
                        <MenuItem eventKey="1">Sandy Hook</MenuItem>
                        <MenuItem eventKey="2">Cape May</MenuItem>
                        <MenuItem eventKey="3" active>Red Bank</MenuItem>
                    </DropdownButton>
                </span>
            </Grid>

            <Panel>
                <Panel.Heading>Debris Breakdown</Panel.Heading>
                <Panel.Body>
                    <Grid fluid>
                        <Row>
                            <Col md={12}>
                                <DateRangeComponent
                                    onDateRangeChanged={this.handleDateRangeChanged.bind(this)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} >
                                <Panel>
                                    <Panel.Heading>Hierarchy</Panel.Heading>
                                    <Panel.Body>
                                        <SunburstChartComponent/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col md={6}>
                                <Panel>
                                    <Panel.Heading>Dirty Dozen</Panel.Heading>
                                    <Panel.Body>
                                        <DirtyDozenComponent/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                         </Row>
                     </Grid>
                  </Panel.Body>
              </Panel>
              <Panel>
                  <Panel.Heading>Historical Trends</Panel.Heading>
                  <Panel.Body>
                      <Grid fluid>
                          <Row>
                              <Col md={9}>
                                  <LineChartComponent/>
                              </Col>
                              <Col md={3}>
                                  <FilterComponent/>
                              </Col>
                          </Row>
                      </Grid>
                  </Panel.Body>
              </Panel>
          </div>
=======
      <div className="LocationDetails">
        <Grid fluid>
        <Row>
          <Col xs={2}>
            <h4>Site Details</h4>
            </Col>
            <Col xs={10}>
              <Select
                className="select-location"
                defaultValue={defaultSiteOptions[0]}
                options={defaultGroupedOptions}
                onChange={this.handleLocationChanged.bind(this)}>
              </Select>
            </Col>
          </Row>
        <Col>
        </Col>
        </Grid>
        <DirtyDozenComponent
          ref={(dirtyDozen) => {this.dirtyDozen = dirtyDozen; }}
          >
        </DirtyDozenComponent>
      </div>
      
>>>>>>> 6e59f9b5c3172b4a1aab3f0dabbc41df6bfd6f1c
    );
  }
}

export default LocationDetails;

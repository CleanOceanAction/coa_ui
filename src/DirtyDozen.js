import React, { Component } from 'react';
import { Table, Panel, Grid, Row, Col } from 'react-bootstrap';

import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'

import { DateRangeComponent } from './DateRange'

import './DirtyDozen.css';


const DEFAULT_DATA = {
    "Paper Clip": 2815,
    "Plastic Bag": 2210,
    "Pencil": 1536,
    "Plastic Cup": 1453,
    "Cigarette Butts": 1211,
    "Soda Cans": 1001,
    "Bottle Caps": 985,
    "Batteries": 580,
    "Paper": 495,
    "Glass Bottles": 382,
    "Screws": 64,
    "Clothing": 28
};

function transformDirtyDozenDataForBarChart(data)
{
    let barChartData = [];
    for (let key in data)
    {
        barChartData.push({"item": key, "count": data[key]});
    }
    return barChartData;
}

function transformDirtyDozenDataForPieChart(data)
{
    let pieChartData = [];
    for (let key in data)
    {
        pieChartData.push({"id": key, "value": data[key]});
    }
    return pieChartData;
}

function transformDirtyDozenDataForTable(data)
{
    let tableData = [];
    let i = 1;
    for (let key in data)
    {
        tableData.push((
        <tr>
            <td>{i}</td>
            <td>{key}</td>
            <td>{data[key]}</td>
            <td>{roundToOneDecimalPercentage(data[key])}</td>
        </tr>));
        i++;
    }
    return tableData;
}

function roundToOneDecimalPercentage(value)
{
    const numberOfDecimals = 1;
    return Math.round(value * (10 * numberOfDecimals)) / (10 * numberOfDecimals);
}


export class DirtyDozenComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            location: {},
            tableItems: [],
            nivoBarChartData: [],
            nivoPieChartData: []
        };
    }

    componentDidMount()
    {
        this.setState({
            tableItems: transformDirtyDozenDataForTable(DEFAULT_DATA),
            nivoBarChartData: transformDirtyDozenDataForBarChart(DEFAULT_DATA),
            nivoPieChartData: transformDirtyDozenDataForPieChart(DEFAULT_DATA)
        });
    }

    handleDateRangeChanged(startDate, endDate)
    {
        console.log("handleDateRangeChanged", startDate, endDate);
        this.setState({
            "startDate": startDate,
            "endDate": endDate
        });this.queryDirtyDozen(this.state.location.category, this.state.location.name, startDate, endDate);
    }

    setLocation(location)
    {
        console.log("location", location);
        this.setState({
            "location": {
                "category": "site",
                "name": location
            }
        });
        this.queryDirtyDozen("site", location, this.state.startDate, this.state.endDate);
    }

    queryDirtyDozen(locationCategory, locationName, startDate, endDate)
    {
        if (locationCategory && locationName && startDate && endDate)
        {
            locationName = locationName.trim().replace(/ /g, "%20");
            let url = `http://coa-flask-app-dev.us-east-1.elasticbeanstalk.com/dirtydozen`
                + `?locationCategory=` + locationCategory
                + `&locationName=` + locationName
                + `&startDate=` + startDate
                + `&endDate=` + endDate
            console.log("url",  url);
            fetch(url,
                {"method": 'GET', "mode": "cors"}) 
            .then(
                function(results) {
                console.log("hello");
                results.json().then(
                    function(data) {
                        console.log(data);
                        this.setState({
                            tableItems: transformDirtyDozenDataForTable(data.items),
                            nivoBarChartData: transformDirtyDozenDataForBarChart(data.items),
                            nivoPieChartData: transformDirtyDozenDataForPieChart(data.items)
                        });
                    }.bind(this));
                }.bind(this)
            , function() { console.log("failed"); });
        }
        else
        {
            console.log("Not enough information to query for dirty dozen statistics.");
        }
    }

        render() {
            return (
                <Grid fluid>
                    <div className="nivo-bar">
                    <ResponsiveBar
                        data={this.state.nivoBarChartData}
                        height={260}
                        keys={[
                            "count",
                        ]}
                        indexBy="item"
                        margin={{
                            "top": 20,
                            "right": 60,
                            "bottom": 100,
                            "left": 60
                        }}
                        layout="vertical"
                        padding={0.3}
                        colors="#0073FF"
                        colorBy="id"
                        defs={[]}
                        fill={[
                            {
                                "match": {
                                    "id": "count"
                                },
                                "id": "lines"
                            }
                        ]}
                        borderColor="#ff8000"
                        axisBottom={{
                            "orient": "bottom",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 45,
                            "legend": "Items",
                            "legendPosition": "middle",
                            "legendOffset": 85
                        }}
                        axisLeft={{
                            "orient": "left",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "Count",
                            "legendPosition": "middle",
                            "legendOffset": -45
                        }}
                        enableGridX={false}
                        enableGridY={false}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor="inherit:darker(1.6)"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        legends={[
                            // {
                            //     "dataFrom": "keys",
                            //     "anchor": "bottom-right",
                            //     "direction": "column",
                            //     "translateX": 120,
                            //     "itemWidth": 100,
                            //     "itemHeight": 20,
                            //     "itemsSpacing": 2,
                            //     "symbolSize": 20
                            // }
                        ]}
                        theme={{
                            "tooltip": {
                                "container": {
                                    "fontSize": "13px"
                                }
                            },
                            "labels": {
                                "textColor": "#444"
                            }
                        }}
                        />
                    </div>
                    <Table condensed responsive bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Debris Item</th>
                                <th>Count</th>
                                <th>% Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tableItems}
                        </tbody>
                    </Table>
                </Grid>
            );
        }
}
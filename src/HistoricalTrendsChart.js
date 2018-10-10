import React, { Component } from 'react';

import { ResponsiveLine } from '@nivo/line'

import './HistoricalTrendsChart.css';

const defaultChartData = [
  {
    "id": "japan",
    "color": "hsl(299, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 9
      },
      {
        "x": "helicopter",
        "y": 33
      },
      {
        "x": "boat",
        "y": 42
      },
      {
        "x": "train",
        "y": 231
      },
      {
        "x": "subway",
        "y": 63
      },
      {
        "x": "bus",
        "y": 280
      },
      {
        "x": "car",
        "y": 35
      },
      {
        "x": "moto",
        "y": 47
      },
      {
        "x": "bicycle",
        "y": 110
      },
      {
        "x": "others",
        "y": 251
      }
    ]
  }
]

export class HistoricalTrendsChart extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            chartData: []
        };
    }

    componentDidMount()
    {
        //TODO: axiom request for stuff
        this.setState({
            chartData: defaultChartData,
        });
    }

    handleDateRangeChanged(startDate, endDate)
    {
        console.log("handleDateRangeChanged");
    }

    setLocation(location)
    {
        console.log("location", location);
    }

    render() {
        return (
            <div className="trendsChart" style={{ height: 500, width: 1300 }}>
                <ResponsiveLine
                    data={this.state.chartData}
                    margin={{
                        "top": 50,
                        "right": 110,
                        "bottom": 50,
                        "left": 60
                    }}
                    xScale={{
                        "type": "point"
                    }}
                    yScale={{
                        "type": "linear",
                        "stacked": true,
                        "min": "auto",
                        "max": "auto"
                    }}
                    minY="auto"
                    maxY="auto"
                    stacked={true}
                    axisBottom={{
                        "orient": "bottom",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legend": "transportation",
                        "legendOffset": 36,
                        "legendPosition": "center"
                    }}
                    axisLeft={{
                        "orient": "left",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legend": "count",
                        "legendOffset": -40,
                        "legendPosition": "center"
                    }}
                    dotSize={10}
                    dotColor="inherit:darker(0.3)"
                    dotBorderWidth={2}
                    dotBorderColor="#ffffff"
                    enableDotLabel={true}
                    dotLabel="y"
                    dotLabelYOffset={-12}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={[
                        {
                            "anchor": "bottom-right",
                            "direction": "column",
                            "justify": false,
                            "translateX": 100,
                            "translateY": 0,
                            "itemsSpacing": 0,
                            "itemDirection": "left-to-right",
                            "itemWidth": 80,
                            "itemHeight": 20,
                            "itemOpacity": 0.75,
                            "symbolSize": 12,
                            "symbolShape": "circle",
                            "symbolBorderColor": "rgba(0, 0, 0, .5)",
                            "effects": [
                                {
                                    "on": "hover",
                                    "style": {
                                        "itemBackground": "rgba(0, 0, 0, .03)",
                                        "itemOpacity": 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        )
    }
}
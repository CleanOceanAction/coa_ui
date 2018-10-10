import React, { Component } from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst'
import { Panel } from 'react-bootstrap';

import './SunburstChart.css';

const DEFAULT_SUNBURST_DATA = {
    "name": "debris",
    "children": [
        {
            "name": "Cloth",
            "children": [
                {
                    "name": "Apparel",
                    "children": [
                        {
                            "name": "Shoes/Sandals",
                            "count": 0
                        },
                        {
                            "name": "Clothing",
                            "count": 7
                        }
                    ]
                },
                {
                    "name": "Textiles",
                    "children": [
                        {
                            "name": "String (No Balloon)",
                            "count": 3
                        },
                        {
                            "name": "Blankets/Sheets/Towels",
                            "count": 3
                        },
                        {
                            "name": "Other Cloth",
                            "count": 8
                        }
                    ]
                }
            ]
        },
        {
            "name": "Foam Plastic",
            "children": [
                {
                    "name": "Dinnerware",
                    "children": [
                        {
                            "name": "Fast Food Containers",
                            "count": 4
                        },
                        {
                            "name": "Foam Plates",
                            "count": 3
                        },
                        {
                            "name": "Foam Cups",
                            "count": 67
                        }
                    ]
                },
                {
                    "name": "Packaging",
                    "children": [
                        {
                            "name": "Meat Trays",
                            "count": 3
                        },
                        {
                            "name": "Egg Cartons",
                            "count": 3
                        }
                    ]
                },
                {
                    "name": "Homegoods",
                    "children": [
                        {
                            "name": "Building Materials",
                            "ount": 19
                        }
                    ]
                },
                {
                    "name": "Foam Plastic Pieces",
                    "children": [
                        
                    ]
                },
                {
                    "name": "Buoys/Floats",
                    "children": [
                        {
                            "name": "Buoys/Floats",
                            "count": 7
                        }
                    ]
                }
            ]
        },
        {
            "name": "Glass",
            "children": [
                {
                    "name": "Bottles/Jars",
                    "children": [
                        {
                            "name": "Beverage Bottles",
                            "count": 34
                        },
                        {
                            "name": "Other Bottles/Jars",
                            "count": 1
                        }
                    ]
                },
                {
                    "name": "Lights",
                    "children": [
                        {
                            "name": "Bulbs",
                            "count": 2
                        },
                        {
                            "name": "Fluorescent Tubes",
                            "count": 5
                        },
                        {
                            "name": "Bulbs",
                            "count": 2
                        }
                    ]
                },
                {
                    "name": "Glass Pieces",
                    "children": [
                        {
                            "name": "Glass Pieces",
                            "count": 82
                        }
                    ]
                }
            ]
        },
        {
            "name": "Metal",
            "children": [
                {
                    "name": "Cans",
                    "children": [
                        {
                            "name": "Aerosol Cans",
                            "count": 2
                        },
                        {
                            "name": "Beverage Cans",
                            "count": 58
                        },
                        {
                            "name": "Other Cans",
                            "count": 1
                        }
                    ]
                },
                {
                    "name": "Auto",
                    "children": [
                        {
                            "name": "Car Parts",
                            "count": 2
                        }
                    ]
                },
                {
                    "name": "Homegoods",
                    "children": [
                        {
                            "name": "Foil",
                            "count": 2
                        },
                        {
                            "name": "Nails",
                            "count": 2
                        }
                    ]
                },
                {
                    "name": "Batteries",
                    "children": [
                        {
                            "name": "Other",
                            "count": 63
                        }
                    ]
                },
                {
                    "name": "Other Metal",
                    "children": [
                        {
                            "name": "Other Metal",
                            "count": 3
                        }
                    ]
                },
                {
                    "name": "Metal Pieces",
                    "children": [
                        {
                            "name": "Other Pieces",
                            "count": 1
                        }
                    ]
                },
                {
                    "name": "Packaging",
                    "children": [
                        {
                            "name": "Wire",
                            "count": 5
                        }
                    ]
                },
            ]
        },
        {
            "name": "Paper",
            "children": [
                {
                    "name": "Cardboard",
                    "children": [
                        {
                            "name": "Cardboard",
                            "count": 20
                        }
                    ]
                },
                {
                    "name": "Containers",
                    "children": [
                        {
                            "name": "Bartons/Boxes",
                            "count": 15
                        },
                        {
                            "name": "Paper Bags",
                            "count": 13
                        }
                    ]
                },
                {
                    "name": "Dinnerware",
                    "children": [
                        {
                            "name": "Cups",
                            "count": 104
                        },
                        {
                            "name": "Plates",
                            "count": 7
                        },
                    ]
                },
                {
                    "name": "Newspaper/Magazines",
                    "children": [
                        {
                            "name": "Newspaper/Magazines",
                            "count": 28
                        }
                    ]
                },
                {
                    "name": "Paper Pieces",
                    "children": [
                        {
                            "name": "Paper Pieces",
                            "count": 190
                        }
                    ]
                },
                {
                    "name": "Other Paper",
                    "children": [
                        {
                            "name": "Other Paper",
                            "count": 10
                        }
                    ]
                }
            ]
        },
        {
            "name": "Plastic",
            "children": [
                {
                    "name": "Packaging",
                    "children": [
                        {
                            "name": "Strapping Bands",
                            "count": 3
                        },
                        {
                            "name": "6-Pack Holders",
                            "count": 15
                        }
                    ]
                },
                {
                    "name": "Bottles",
                    "children": [
                        {
                            "name": "Tan Oil/Lotion Bottle",
                            "count": 3
                        },
                        {
                            "name": "Motor Oil/Lube Bottles",
                            "count": 8
                        },
                        {
                            "name": "Other Bottles",
                            "count": 13
                        },
                        {
                            "name": "Cap/Rings",
                            "count": 68
                        }, 
                        {
                            "name": "Cap/Lids",
                            "count": 444
                        },
                        {
                            "name": "Bleach/Cleaner Bottles",
                            "count": 2
                        },
                        {
                            "name": "Beverages/Soda Bottles",
                            "count": 273
                        }
                    ]
                },
                {
                    "name": "Containers",
                    "children": [
                        {
                            "name": "Buckets/Crates/Bins",
                            "count": 1
                        }
                    ]
                },
                {
                    "name": "Cigarettes",
                    "children": [
                        {
                            "name": "Lighers",
                            "count": 6
                        },
                        {
                            "name": "Packaging",
                            "count": 120
                        },
                        {
                            "name": "Filters",
                            "count": 1238
                        },
                        {
                            "name": "Cigar Tips",
                            "count": 36
                        }
                    ]
                },
                {
                    "name": "Homegoods",
                    "children": [
                        {
                            "name": "Rope",
                            "count": 26
                        },
                        {
                            "name": "Ribbon/Tape (No Balloon)",
                            "count": 15
                        },
                        {
                            "name": "Diapers",
                            "count": 1
                        }
                    ]
                },
                {
                    "name": "Fishing",
                    "children": [
                        {
                            "name": "Line",
                            "count": 11
                        },
                        {
                            "name": "Fishing Nets",
                            "count": 2
                        }
                    ]
                },
                {
                    "name": "Bags/Wrappers",
                    "children": [
                        {
                            "name": "Trash Bags",
                            "count": 22
                        },
                        {
                            "name": "Store/Shopping Bags",
                            "count": 74
                        },
                        {
                            "name": "Other Bags",
                            "count": 36
                        },
                        {
                            "name": "Food, Candy Wrappers/Bags",
                            "count": 813
                        }
                    ]
                },
                {
                    "name": "Utensils",
                    "children": [
                        {
                            "name": "Forks/Knives/Spoons",
                            "count": 83
                        }
                    ]
                },
                {
                    "name": "Plastic Pieces",
                    "children": [
                        {
                            "name": "Plastic Pieces",
                            "count": 383
                        }
                    ]
                },
                {
                    "name": "Firearms",
                    "children": [
                        {
                            "name": "Shotgun Shells",
                            "count": 6
                        }
                    ]
                },
                {
                    "name": "Personal Care Products",
                    "children": [
                        {
                            "name": "Tampon Applicators",
                            "count": 125
                        },
                        {
                            "name": "Syringes",
                            "count": 9
                        }
                    ]
                },
                {
                    "name": "Toys",
                    "children": [
                        {
                            "name": "Toys",
                            "count": 12
                        }
                    ]
                }
            ]
        },
        {
            "name": "Rubber",
            "children": [
                {
                    "name": "Personal Care Products",
                    "children": [
                        {
                            "name": "Condoms",
                            "count": 37
                        }
                    ]
                },
                {
                    "name": "Apparel",
                    "children": [
                        {
                            "name": "Gloves",
                            "count": 1
                        }
                    ]
                },
                {
                    "name": "Balloons",
                    "children": [
                        {
                            "name": " Rubber",
                            "count": 33
                        },
                        {
                            "name": "Mylar",
                            "count": 26
                        }
                    ]
                },
                {
                    "name": "Other Rubber",
                    "children": [
                        {
                            "name": "Other Rubber",
                            "count": 1
                        }
                    ]
                }
            ]
        },
        {
            "name": "Wood",
            "children": [
                {
                    "name": "Utensils",
                    "children": [
                        {
                            "name": "Ice Cream Spoon/Sticks",
                            "count": 12
                        }
                    ]
                },
                {
                    "name": "Lumber Pieces",
                    "children": [
                        {
                            "name": "Lumber Pieces",
                            "count": 25
                        }
                    ]
                },
                {
                    "name": "Other Wood",
                    "children": [
                        {
                            "name": "Other Wood",
                            "count": 5
                        }
                    ]
                }
            ]
        }
    ]
};

const DEFAULT_CHART_DATA = {
    "name": "nivo",
    "color": "hsl(331, 70%, 50%)",
    "children": [
      {
        "name": "viz",
        "color": "hsl(301, 70%, 50%)",
        "children": [
          {
            "name": "stack",
            "color": "hsl(34, 70%, 50%)",
            "children": [
              {
                "name": "chart",
                "color": "hsl(123, 70%, 50%)",
                "loc": 192856
              },
              {
                "name": "xAxis",
                "color": "hsl(269, 70%, 50%)",
                "loc": 95341
              },
              {
                "name": "yAxis",
                "color": "hsl(52, 70%, 50%)",
                "loc": 168058
              },
              {
                "name": "layers",
                "color": "hsl(198, 70%, 50%)",
                "loc": 50541
              }
            ]
          },
          {
            "name": "pie",
            "color": "hsl(143, 70%, 50%)",
            "children": [
              {
                "name": "chart",
                "color": "hsl(139, 70%, 50%)",
                "children": [
                  {
                    "name": "pie",
                    "color": "hsl(94, 70%, 50%)",
                    "children": [
                      {
                        "name": "outline",
                        "color": "hsl(214, 70%, 50%)",
                        "loc": 25053
                      },
                      {
                        "name": "slices",
                        "color": "hsl(79, 70%, 50%)",
                        "loc": 80433
                      },
                      {
                        "name": "bbox",
                        "color": "hsl(88, 70%, 50%)",
                        "loc": 175681
                      }
                    ]
                  },
                  {
                    "name": "donut",
                    "color": "hsl(129, 70%, 50%)",
                    "loc": 177793
                  },
                  {
                    "name": "gauge",
                    "color": "hsl(100, 70%, 50%)",
                    "loc": 83377
                  }
                ]
              },
              {
                "name": "legends",
                "color": "hsl(184, 70%, 50%)",
                "loc": 162211
              }
            ]
          }
        ]
      },
      {
        "name": "colors",
        "color": "hsl(144, 70%, 50%)",
        "children": [
          {
            "name": "rgb",
            "color": "hsl(165, 70%, 50%)",
            "loc": 30954
          },
          {
            "name": "hsl",
            "color": "hsl(53, 70%, 50%)",
            "loc": 92818
          }
        ]
      },
      {
        "name": "utils",
        "color": "hsl(200, 70%, 50%)",
        "children": [
          {
            "name": "randomize",
            "color": "hsl(56, 70%, 50%)",
            "loc": 85717
          },
          {
            "name": "resetClock",
            "color": "hsl(96, 70%, 50%)",
            "loc": 119631
          },
          {
            "name": "noop",
            "color": "hsl(352, 70%, 50%)",
            "loc": 142108
          },
          {
            "name": "tick",
            "color": "hsl(198, 70%, 50%)",
            "loc": 95278
          },
          {
            "name": "forceGC",
            "color": "hsl(165, 70%, 50%)",
            "loc": 113779
          },
          {
            "name": "stackTrace",
            "color": "hsl(185, 70%, 50%)",
            "loc": 18850
          },
          {
            "name": "dbg",
            "color": "hsl(24, 70%, 50%)",
            "loc": 196513
          }
        ]
      },
      {
        "name": "generators",
        "color": "hsl(338, 70%, 50%)",
        "children": [
          {
            "name": "address",
            "color": "hsl(103, 70%, 50%)",
            "loc": 66682
          },
          {
            "name": "city",
            "color": "hsl(191, 70%, 50%)",
            "loc": 34677
          },
          {
            "name": "animal",
            "color": "hsl(187, 70%, 50%)",
            "loc": 25551
          },
          {
            "name": "movie",
            "color": "hsl(35, 70%, 50%)",
            "loc": 163168
          },
          {
            "name": "user",
            "color": "hsl(44, 70%, 50%)",
            "loc": 74325
          }
        ]
      },
      {
        "name": "set",
        "color": "hsl(202, 70%, 50%)",
        "children": [
          {
            "name": "clone",
            "color": "hsl(127, 70%, 50%)",
            "loc": 64358
          },
          {
            "name": "intersect",
            "color": "hsl(298, 70%, 50%)",
            "loc": 134696
          },
          {
            "name": "merge",
            "color": "hsl(220, 70%, 50%)",
            "loc": 98316
          },
          {
            "name": "reverse",
            "color": "hsl(61, 70%, 50%)",
            "loc": 15883
          },
          {
            "name": "toArray",
            "color": "hsl(156, 70%, 50%)",
            "loc": 132810
          },
          {
            "name": "toObject",
            "color": "hsl(96, 70%, 50%)",
            "loc": 104120
          },
          {
            "name": "fromCSV",
            "color": "hsl(358, 70%, 50%)",
            "loc": 24468
          },
          {
            "name": "slice",
            "color": "hsl(283, 70%, 50%)",
            "loc": 52878
          },
          {
            "name": "append",
            "color": "hsl(104, 70%, 50%)",
            "loc": 159192
          },
          {
            "name": "prepend",
            "color": "hsl(114, 70%, 50%)",
            "loc": 126307
          },
          {
            "name": "shuffle",
            "color": "hsl(279, 70%, 50%)",
            "loc": 104486
          },
          {
            "name": "pick",
            "color": "hsl(201, 70%, 50%)",
            "loc": 37317
          },
          {
            "name": "plouc",
            "color": "hsl(226, 70%, 50%)",
            "loc": 117399
          }
        ]
      },
      {
        "name": "text",
        "color": "hsl(93, 70%, 50%)",
        "children": [
          {
            "name": "trim",
            "color": "hsl(264, 70%, 50%)",
            "loc": 38859
          },
          {
            "name": "slugify",
            "color": "hsl(70, 70%, 50%)",
            "loc": 114480
          },
          {
            "name": "snakeCase",
            "color": "hsl(273, 70%, 50%)",
            "loc": 145625
          },
          {
            "name": "camelCase",
            "color": "hsl(341, 70%, 50%)",
            "loc": 147012
          },
          {
            "name": "repeat",
            "color": "hsl(115, 70%, 50%)",
            "loc": 124994
          },
          {
            "name": "padLeft",
            "color": "hsl(348, 70%, 50%)",
            "loc": 55608
          },
          {
            "name": "padRight",
            "color": "hsl(331, 70%, 50%)",
            "loc": 115439
          },
          {
            "name": "sanitize",
            "color": "hsl(108, 70%, 50%)",
            "loc": 92286
          },
          {
            "name": "ploucify",
            "color": "hsl(240, 70%, 50%)",
            "loc": 127480
          }
        ]
      },
      {
        "name": "misc",
        "color": "hsl(264, 70%, 50%)",
        "children": [
          {
            "name": "whatever",
            "color": "hsl(213, 70%, 50%)",
            "children": [
              {
                "name": "hey",
                "color": "hsl(18, 70%, 50%)",
                "loc": 72649
              },
              {
                "name": "WTF",
                "color": "hsl(205, 70%, 50%)",
                "loc": 137258
              },
              {
                "name": "lol",
                "color": "hsl(134, 70%, 50%)",
                "loc": 185593
              },
              {
                "name": "IMHO",
                "color": "hsl(43, 70%, 50%)",
                "loc": 65789
              }
            ]
          },
          {
            "name": "other",
            "color": "hsl(316, 70%, 50%)",
            "loc": 82541
          },
          {
            "name": "crap",
            "color": "hsl(241, 70%, 50%)",
            "children": [
              {
                "name": "crapA",
                "color": "hsl(126, 70%, 50%)",
                "loc": 11159
              },
              {
                "name": "crapB",
                "color": "hsl(109, 70%, 50%)",
                "children": [
                  {
                    "name": "crapB1",
                    "color": "hsl(259, 70%, 50%)",
                    "loc": 35424
                  },
                  {
                    "name": "crapB2",
                    "color": "hsl(179, 70%, 50%)",
                    "loc": 159556
                  },
                  {
                    "name": "crapB3",
                    "color": "hsl(130, 70%, 50%)",
                    "loc": 168792
                  },
                  {
                    "name": "crapB4",
                    "color": "hsl(326, 70%, 50%)",
                    "loc": 122558
                  }
                ]
              },
              {
                "name": "crapC",
                "color": "hsl(175, 70%, 50%)",
                "children": [
                  {
                    "name": "crapC1",
                    "color": "hsl(117, 70%, 50%)",
                    "loc": 151796
                  },
                  {
                    "name": "crapC2",
                    "color": "hsl(107, 70%, 50%)",
                    "loc": 197968
                  },
                  {
                    "name": "crapC3",
                    "color": "hsl(60, 70%, 50%)",
                    "loc": 34451
                  },
                  {
                    "name": "crapC4",
                    "color": "hsl(86, 70%, 50%)",
                    "loc": 150435
                  },
                  {
                    "name": "crapC5",
                    "color": "hsl(10, 70%, 50%)",
                    "loc": 186080
                  },
                  {
                    "name": "crapC6",
                    "color": "hsl(5, 70%, 50%)",
                    "loc": 107085
                  },
                  {
                    "name": "crapC7",
                    "color": "hsl(216, 70%, 50%)",
                    "loc": 64269
                  },
                  {
                    "name": "crapC8",
                    "color": "hsl(74, 70%, 50%)",
                    "loc": 179695
                  },
                  {
                    "name": "crapC9",
                    "color": "hsl(184, 70%, 50%)",
                    "loc": 11828
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
};

export class SunburstChartComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            chartData: {}
        };
    }

    componentDidMount()
    {
        this.setState({
            chartData: DEFAULT_CHART_DATA
        });
    }

    render() {
        return (
            <div className="nivo-sunburst">
                <ResponsiveSunburst
                    data={DEFAULT_SUNBURST_DATA}
                    margin={{
                        "top": 40,
                        "right": 20,
                        "bottom": 20,
                        "left": 20
                    }}
                    identity="name"
                    value="count"
                    cornerRadius={2}
                    borderWidth={1}
                    borderColor="white"
                    colors="yellow_green_blue"
                    colorBy="id"
                    childColor="inherit"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    isInteractive={true}
                />
            </div>
        );
    }
}
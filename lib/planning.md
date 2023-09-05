# Route Finder - Project 3 Planning

Done by Aleksandr (Alex) Stepanov

## Project Choice - Route Finder

"Route Finder" project is designed to help users submit routing problems to Mapbox.com via an API and then visualize the solutions on a map. The project can be very useful for various applications, such as route planning, navigation, logistics, or any scenario where you need to find optimal routes between locations.

## Wireframes

### Locations page

![Locations page](../assets/Location_Index.png)

### Create Routing Problem Page

![Create Routing Problem Page](../assets/Theme_Add.jpg)

### View Routing Solutions Page

![View Routing Solutions Page](../assets/Theme_Show.jpg)

## Models/Schemas

### Primary Schema: RoutingProblem

| Property | Type | Validations | Default Value |
|----------|----------|----------|----------|


### Seconadary Schema: Location

| Property | Type | Validations | Default Value |
|----------|----------|----------|----------|

## Entity Relationship Diagram

![Route Finder ERD](../assets/Route_Finder_ERD.png)

[ERD on Lucid.app](https://lucid.app/lucidchart/cf946bce-6a36-486c-b658-4346058941cc/edit?invitationId=inv_fdc0247d-4a8b-4d90-98bd-5451d58dcc01)

## MVP CRUD / RESTful Routes
 Route name | CRUD operation | URL endpoint | Module name | Controller Action | Notes |
|----------|----------|----------|----------|----------|----------|

## JSON Samples - Mapbox Optimization API v2

[Optimization API v2 documentation](https://docs.mapbox.com/api/navigation/optimization/)

### Submit Routing Problem

__POST__ /optimized-trips/v2?access_token=pk.eyJ1Ijoic3RlcGFub3Zjb2RlcyIsImEiOiJjbGxzdjVuc2kwMTBuM2VxdGpzcHRtMnl4In0.r0XemjswrRcT_waet1Ra-A

__Host:__ api.mapbox.com

__Content-Type:__ application/json

```json
{
  "version": 1,
  "locations": [
    {
      "name": "Ziing Final Mile",
      "coordinates": [-114.03151911163748, 51.134781969042855]
    },
    {
      "name": "Walmart Deerfoot Meadows",
      "coordinates": [-114.04589934397148, 50.984229703113805]
    },
    {
      "name": "Walmart Macleod Trail",
      "coordinates": [-114.06925296358729, 50.96589652763478]
    },
    {
      "name": "Walmart Westbrook Mall",
      "coordinates": [-114.13960391346596, 51.04103642257829]
    },
    {
      "name": "Walmart Northland Village",
      "coordinates": [-114.14385389765789, 51.09697148661812]
    },
    {
      "name": "Walmart Marlborough Mall",
      "coordinates": [-113.97846644509163, 51.05348501762572]
    }
  ],
  "vehicles": [
    {
      "name": "truck-1",
      "routing_profile": "mapbox/driving-traffic",
      "start_location": "Ziing Final Mile",
      "end_location": "Ziing Final Mile"
    },
    {
      "name": "truck-2",
      "routing_profile": "mapbox/driving-traffic",
      "start_location": "Ziing Final Mile",
      "end_location": "Ziing Final Mile"
    }
  ],
  "services": [
    {
      "name": "work-order-1",
      "location": "Walmart Deerfoot Meadows",
      "duration": 300
    },
    {
      "name": "work-order-2",
      "location": "Walmart Macleod Trail",
      "duration": 300
    },
    {
      "name": "work-order-3",
      "location": "Walmart Westbrook Mall",
      "duration": 300
    },
    {
      "name": "work-order-4",
      "location": "Walmart Northland Village",
      "duration": 300
    },
    {
      "name": "work-order-5",
      "location": "Walmart Marlborough Mall",
      "duration": 300
    }
  ],
  "options": {
    "objectives": ["min-schedule-completion-time"]
  }
}
```

### Retrieve Solution

__GET__ /optimized-trips/v2/123e4567-e89b-12d3-a456-426655440000?access_token=pk.eyJ1Ijoic3RlcGFub3Zjb2RlcyIsImEiOiJjbGxzdjVuc2kwMTBuM2VxdGpzcHRtMnl4In0.r0XemjswrRcT_waet1Ra-A

__Host:__ api.mapbox.com

__Content-Type:__ application/json

```json
{
    "dropped": {
        "services": [],
        "shipments": []
    },
    "routes": [
        {
            "vehicle": "truck-2",
            "stops": [
                {
                    "location": "Ziing Final Mile",
                    "location_metadata": {
                        "supplied_coordinate": [
                            -114.03151911163748,
                            51.134781969042855
                        ],
                        "snapped_coordinate": [
                            -114.032272,
                            51.134782
                        ]
                    },
                    "eta": "1970-01-01T00:00:00Z",
                    "type": "start",
                    "odometer": 0,
                    "wait": 0
                },
                {
                    "location": "Walmart Deerfoot Meadows",
                    "location_metadata": {
                        "supplied_coordinate": [
                            -114.04589934397148,
                            50.984229703113805
                        ],
                        "snapped_coordinate": [
                            -114.045233,
                            50.984281
                        ]
                    },
                    "eta": "1970-01-01T00:21:37Z",
                    "type": "service",
                    "duration": 300,
                    "services": [
                        "work-order-1"
                    ],
                    "odometer": 23152,
                    "wait": 0
                },
                {
                    "location": "Walmart Macleod Trail",
                    "location_metadata": {
                        "supplied_coordinate": [
                            -114.06925296358727,
                            50.96589652763478
                        ],
                        "snapped_coordinate": [
                            -114.069892,
                            50.965897
                        ]
                    },
                    "eta": "1970-01-01T00:34:24Z",
                    "type": "service",
                    "duration": 300,
                    "services": [
                        "work-order-2"
                    ],
                    "odometer": 27968,
                    "wait": 0
                },
                {
                    "location": "Walmart Marlborough Mall",
                    "location_metadata": {
                        "supplied_coordinate": [
                            -113.97846644509164,
                            51.05348501762572
                        ],
                        "snapped_coordinate": [
                            -113.977613,
                            51.053484
                        ]
                    },
                    "eta": "1970-01-01T00:56:35Z",
                    "type": "service",
                    "duration": 300,
                    "services": [
                        "work-order-5"
                    ],
                    "odometer": 45401,
                    "wait": 0
                },
                {
                    "location": "Ziing Final Mile",
                    "location_metadata": {
                        "supplied_coordinate": [
                            -114.03151911163748,
                            51.134781969042855
                        ],
                        "snapped_coordinate": [
                            -114.032272,
                            51.134782
                        ]
                    },
                    "eta": "1970-01-01T01:16:52Z",
                    "type": "end",
                    "odometer": 62625
                }
            ]
        },
        {
            "vehicle": "truck-1",
            "stops": [
                {
                    "location": "Ziing Final Mile",
                    "location_metadata": {
                        "supplied_coordinate": [
                            -114.03151911163748,
                            51.134781969042855
                        ],
                        "snapped_coordinate": [
                            -114.032272,
                            51.134782
                        ]
                    },
                    "eta": "1970-01-01T00:00:00Z",
                    "type": "start",
                    "odometer": 0,
                    "wait": 0
                },
                {
                    "location": "Walmart Westbrook Mall",
                    "location_metadata": {
                        "supplied_coordinate": [
                            -114.13960391346596,
                            51.04103642257829
                        ],
                        "snapped_coordinate": [
                            -114.138881,
                            51.04104
                        ]
                    },
                    "eta": "1970-01-01T00:26:54Z",
                    "type": "service",
                    "duration": 300,
                    "services": [
                        "work-order-3"
                    ],
                    "odometer": 23537,
                    "wait": 0
                },
                {
                    "location": "Walmart Northland Village",
                    "location_metadata": {
                        "supplied_coordinate": [
                            -114.14385389765788,
                            51.09697148661812
                        ],
                        "snapped_coordinate": [
                            -114.143856,
                            51.096475
                        ]
                    },
                    "eta": "1970-01-01T00:45:13Z",
                    "type": "service",
                    "duration": 300,
                    "services": [
                        "work-order-4"
                    ],
                    "odometer": 32746,
                    "wait": 0
                },
                {
                    "location": "Ziing Final Mile",
                    "location_metadata": {
                        "supplied_coordinate": [
                            -114.03151911163748,
                            51.134781969042855
                        ],
                        "snapped_coordinate": [
                            -114.032272,
                            51.134782
                        ]
                    },
                    "eta": "1970-01-01T01:09:09Z",
                    "type": "end",
                    "odometer": 51266
                }
            ]
        }
    ],
    "version": 1
}
```

### List Submissions and Their Status

__GET__ /optimized-trips/v2?access_token=pk.eyJ1Ijoic3RlcGFub3Zjb2RlcyIsImEiOiJjbGxzdjVuc2kwMTBuM2VxdGpzcHRtMnl4In0.r0XemjswrRcT_waet1Ra-A

__Host__: api.mapbox.com

__Content-Type:__ application/json

```json
[
    {
        "id": "05ae6d8a-232e-4472-ad70-e52b81ffad5b",
        "status": "complete"
    },
    {
        "id": "1d40227e-6c6a-4daf-ab43-aba017eeb979",
        "status": "complete"
    },
    {
        "id": "22408f96-7aef-45a1-a8b3-9de2abe05234",
        "status": "complete"
    },
    {
        "id": "592c9c15-41c2-4cd0-a2be-4fff73996092",
        "status": "complete"
    },
    {
        "id": "a3eb34ca-5424-43f2-9964-dc2bcd115f81",
        "status": "complete"
    },
    {
        "id": "c9aa88d1-7f50-4f21-82b2-5c89a95e59d4",
        "status": "complete"
    }
]
```

## Component Tree

## Trello Sprint Board

Trello sprint board [link](https://trello.com/invite/b/PcfGsH7j/ATTI7b7c87f894baa428babcfacad30713a0625CD735/route-finder)

## User Stories

| US_ID__# | Short Name | Description | SP | Priority | Risk | Sprint | Dependant on US ID# |
|-------|------------|-------------|----|----------|------|--------|---------------------|

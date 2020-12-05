# Find Ride


## How to start

### Requirements
 - NodeJS 12
 - MySQL

### Tech
 - NodeJS
 - Express
 - MySQL

### Steps
 - Create database in mysql
 - Update `config.ts` file with db name and creds
 - Run `yarn install`
 - Run `yarn build`
 - run `yarn start`


# API endpoints

###  Update API

**Endpoint** - `/api/update`

**Request**
```javascript
{
	"driverId": 1,
	"lat": "-28.3595",
	"long": "77.0266"
}
```

**Response** 
``` javascript
{
    "status": {
        "code": 0,
        "message": "Success"
    }
}
```


**CURL**  - can be imported in postman
``` curl
curl --location --request PUT 'http://localhost:3000/api/update' \
--header 'Content-Type: application/json' \
--data-raw '{
    "driverId": 1,
    "lat": "-28.3595",
    "long": "77.0266"
}'
```

###  Nearby Drivers API

**Endpoint** - `/api/nearby`

**Request**
`http://localhost:3000/api/nearby?lat=28.4594&long=77.0266&radius=2000000`

radius is optional request param


**response**

``` javascript
{
    "status": {
        "code": 0,
        "message": "Success"
    },
    "data": [
        {
            "id": 8,
            "name": "Mr. Ezra Jadyn",
            "age": "35",
            "phone": "+91 - 86 956 46402",
            "vehicle": {
                "number": "HP-12-K-1714",
                "model": "BAJAJ E RiCKSHAW"
            },
            "location": {
                "lat": "28.45940000",
                "long": "77.02660000"
            },
            "distance": 0
        },
        {
            "id": 88,
            "name": "Mr. Marko Zayd",
            "age": "22",
            "phone": "+91 - 93 425 69957",
            "vehicle": {
                "number": "HP-12-A-6879",
                "model": "BAJAJ E RiCKSHAW"
            },
            "location": {
                "lat": "28.45940000",
                "long": "77.02660000"
            },
            "distance": 0
        }
    ]
}
```

**Curl**

```
curl --location --request GET 'http://localhost:3000/api/nearby?lat=28.4594&long=77.0266&radius=10' \

```



# Assumptions

 - All API endpoints are REST endpoints
 - Basic validations for body and query params added on API
 - `/update` API is called from client to update location
 - Before Server startup database is seeded with random driver and driver locations

# Approach To Solution


### tables

```
mysql> desc drivers;
+----------------+-------------+------+-----+---------+-------+
| Field          | Type        | Null | Key | Default | Extra |
+----------------+-------------+------+-----+---------+-------+
| id             | int         | NO   | PRI | NULL    |       |
| name           | varchar(45) | NO   |     | NULL    |       |
| age            | varchar(45) | NO   |     | NULL    |       |
| vehicle_number | varchar(45) | NO   |     | NULL    |       |
| vehicle_model  | varchar(45) | NO   |     | NULL    |       |
| phone          | varchar(45) | NO   |     | NULL    |       |
+----------------+-------------+------+-----+---------+-------+

mysql> desc driver_locations;
+----------+---------------+------+-----+---------+-------+
| Field    | Type          | Null | Key | Default | Extra |
+----------+---------------+------+-----+---------+-------+
| id       | int           | NO   | PRI | NULL    |       |
| lat      | decimal(10,8) | NO   | PRI | NULL    |       |
| long     | decimal(11,8) | NO   | PRI | NULL    |       |
| driverId | int           | NO   | MUL | NULL    |       |
+----------+---------------+------+-----+---------+-------+


```

  - used two tables to store data `drivers` and `driver_locations`
  - To store lat long used decimal type


### Find locations in radus of circle
 - Used `spherical law of cosines` to calculate distance between  points on sphere 
 - First found all points in bounded square
 - Loop over all points from step 2 and calculate distance from requested points
 - Filter out points with distance greater


# Imporvements
 - Update can be done via websockets
 - Optimise location finding query using better tech maybe GIS

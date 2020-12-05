import { map } from "lodash";
import DatabaseConnection from "../mysqlConn";
import { DriverLocation, DriverLocationUpdateRequest, DriverResponse, LatLongBounds } from "../types";



export const insertDriverLocation = async (driverLocation: DriverLocation) => {
  const {
    id, lat, long, driverId
  } = driverLocation;

  const query = `INSERT INTO \`driver_locations\`
              (\`id\`,
              \`lat\`,
              \`long\`,
              \`driverId\`)
              VALUES
              (${id}, ${lat}, ${long}, ${driverId});`

  try {

    const pool = await DatabaseConnection.getConnectionPool()

    await pool.query(query)

  } catch (err) {
    console.error("Failed to insert")
    console.debug(query)
    throw err
  }
}

export const update = async (updateData: DriverLocationUpdateRequest) => {
  const query = "UPDATE `driver_locations` SET `lat` = ?, `long` = ? WHERE `driverId` = ?;"
  const {
    driverId, lat, long
  } = updateData;
  try {

    const pool = await DatabaseConnection.getConnectionPool()

    const [results] = await pool.execute(query, [lat, long, driverId])

  } catch (err) {
    console.error("Failed to update")
    console.debug(query, updateData)
    throw err
  }
}


export const findInBoundedRectangle = async (bounds: LatLongBounds): Promise<DriverResponse[]> => {
  const query = "SELECT  `driverId`, `lat`, `long`, `name`, `age`, `phone`, `vehicle_number`, `vehicle_model` \n" +
    " From `driver_locations` \n" +
    " INNER JOIN `drivers` ON `drivers`.`id` = `driver_locations`.`driverId` "
  " WHERE `lat` Between ? And ? \n" +
    " And `long` Between ? And ? \n;"
  const {
    minLat, maxLat, maxLong, minLong
  } = bounds;

  try {

    const pool = await DatabaseConnection.getConnectionPool()

    const [results] = await pool.execute(query, [minLat, maxLat, minLong, maxLong])

    return map(results, (result: any) => {
      return {
        id: result.driverId,
        name: result.name,
        age: result.age,
        phone: result.phone,
        vehicle: {
          number: result.vehicle_number,
          model: result.vehicle_model
        },
        location: {
          lat: result.lat,
          long: result.long
        }
      }
    })

  } catch (err) {
    console.error("Failed to execute")
    console.debug(query)
    throw err
  }
}

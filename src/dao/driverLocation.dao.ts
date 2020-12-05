import DatabaseConnection from "../mysqlConn";
import { DriverLocation } from "../types";



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

    const [results] = await pool.query(query)

    console.log(results)
  } catch(err) {
    console.log("Failed to insert")
    console.log(query)
    throw err
  }


}

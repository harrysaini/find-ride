import DatabaseConnection from "../mysqlConn";
import { Driver } from "../types";


export const insertDriver = async (driver: Driver) => {
  try {
    const {
      id, name, age, phone, vehicle_model, vehicle_number
    } = driver
    const values = [id, name, age, vehicle_number, vehicle_model, phone]

    const query = `
          INSERT INTO \`drivers\`
              (\`id\`,
              \`name\`,
              \`age\`,
              \`vehicle_number\`,
              \`vehicle_model\`,
              \`phone\`)
              VALUES
              (?, ?, ?, ?, ?, ?);
          `

    const pool = await DatabaseConnection.getConnectionPool()

    await pool.execute(query, values)

  } catch (err) {
    console.error("Failed to insert")
    console.debug(driver)
    throw err
  }
}

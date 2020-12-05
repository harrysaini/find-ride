import { readFileSync } from "fs";
import path = require("path");
import { Connection } from "mysql2/promise";
import { chunk } from 'lodash'

import { getDriversObjects } from "./getRandomData";
import { Driver, DriverLocation } from "../types";
import { insertDriver } from "../dao/driver.dao";
import { insertDriverLocation } from "../dao/driverLocation.dao";

const initSQLFilePath = path.resolve(__dirname, './../../sql/createTables.sql');

export const initTables = async (connection: Connection) => {
  const initTablesSQLFile = readFileSync(initSQLFilePath, 'utf-8');
  const [rows, fields] = await connection.query(initTablesSQLFile);

  console.log(rows, fields);
};


const insertDrivers = async (drivers: Driver[]) => {

  for(let chnk of chunk(drivers, 10)){
    const promises = chnk.map(driver => {
      return insertDriver(driver);
    })

    await Promise.all(promises)
  }


}

const insertDriverLocations = async (driverLocations: DriverLocation[]) => {
  for(let chnk of chunk(driverLocations, 10)){

    const promises = chnk.map(driverLocation => {
      return insertDriverLocation(driverLocation)
    })

    await Promise.all(promises)
  }

}


export const seedDatabase = async () => {
  try {
    console.log("SEEDING DATABASE WITH DRIVERS ROWS ")
    const {
      drivers,
      driverLocations
    } = getDriversObjects();

    await insertDrivers(drivers)
    await insertDriverLocations(driverLocations)
  } catch(err) {
    console.log(err)
    console.log("FAILED TO SEED ROWS")
    console.log("WILL continue ...... to serve requests ....... \n ........ \n .........")
  }
}



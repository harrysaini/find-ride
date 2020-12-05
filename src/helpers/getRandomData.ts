import { Driver, DriverLocation } from "../types";
import { random, sample } from 'lodash';
import { LOCATIONS, NAMES, VEHICLE_STARTS } from "./sampleData";

const DRIVERS_COUNT = 100;


export const getDriversObjects = () => {
  const drivers: Driver[] = [];
  const driverLocations: DriverLocation[] = [];

  for (let i = 1; i <= DRIVERS_COUNT; i++) {
    drivers.push({
      id: i,
      name: `Mr. ${sample(NAMES)} ${sample(NAMES)}`,
      age: random(18, 45),
      vehicle_number: `${sample(VEHICLE_STARTS)}-${random(1111, 9999)}`,
      vehicle_model: 'BAJAJ E RiCKSHAW',
      phone: `+91 - ${random(80, 99)} ${random(111, 999)} ${random(11111, 99999)}`
    })
    // SAMPLE may return undefined
    const location = sample(LOCATIONS) || LOCATIONS[0]
    driverLocations.push({
      id: i,
      driverId: i,
      lat: location?.lat ,
      long: location?.long
    })
  }

  return {
    drivers,
    driverLocations
  }

}

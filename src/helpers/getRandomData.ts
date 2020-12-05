import { Driver, DriverLocation } from "../types";
import {random, sample } from 'lodash';
import { LOCATIONS, NAMES, VEHICLE_STARTS } from "./sampleData";

const DRIVERS_COUNT = 1000;


export const getDriversObjects = () => {
    const drivers: Driver[] = [];
    const driverLocations: DriverLocation[] = [];

    for (let i = 1 ; i<= DRIVERS_COUNT ; i++) {
        drivers.push({
            id: i,
            name: `Mr. ${sample(NAMES)} ${sample(NAMES)}`,
            age: random(18, 45),
            vehicle_number: `${sample(VEHICLE_STARTS)}-${random(1111, 9999)}`,
            vehicle_model: 'BAJAJ E RiCKSHAW',
            phone: `+91 - ${random(80, 99)} ${random(111, 999)} ${random(11111, 99999)}`
        })
        const location = sample(LOCATIONS)
        driverLocations.push({
            id: i,
            driverId: i,
            // ADDED lat long in string for floating point precision
            lat: location?.lat as unknown as number,
            long: location?.long as unknown as number
        })
    }

    return {
        drivers,
        driverLocations
    }

}

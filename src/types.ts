export type Driver = {
    id: number;
    name: string;
    age: number;
    vehicle_number: string;
    vehicle_model: string;
    phone: string;
}


export type DriverLocation = {
    id: number;
    driverId: number;
    lat: number;
    long: number;
}
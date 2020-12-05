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

export type DriverLocationUpdateRequest = {
  driverId: number;
  lat: number;
  long: number;
}

export type LatLongBounds = {
  minLat: number;
  minLong: number;
  maxLat: number;
  maxLong: number;
}

export type DriverResponse = {
  id: any;
  name: any;
  age: any;
  phone: any;
  vehicle: {
    number: any;
    model: any;
  };
  location: {
    lat: any;
    long: any;
  };
}


export type NearbyRequest = {
  lat: number;
  long: number;
  radius: number;
}

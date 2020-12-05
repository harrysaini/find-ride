import { findInBoundedRectangle, update } from "./dao/driverLocation.dao";
import { DriverLocationUpdateRequest, LatLongBounds, NearbyRequest } from "./types";

const R = 6371e3; // earth radius in metres
const {
  sin, cos, acos, PI
} = Math

export const updateLocation = async (updateData: DriverLocationUpdateRequest) => {
  await update(updateData)
}


export const findNearby = async (params: NearbyRequest) => {

  console.log(params)
  const {
    lat, long, radius
  } = params

  const bounds: LatLongBounds = {
    minLat: lat - ((radius / R) * (180 / PI)),
    maxLat: lat + (radius / R) * (180 / PI),
    minLong: long - ((radius / R) * (180 / PI)) / cos(lat * PI / 180),
    maxLong: long + ((radius / R) * (180 / PI)) / cos(lat * PI / 180),
  };

  console.log(bounds)


  // GET all points in bounded rectangle
  const resultsInBoundingBox = await findInBoundedRectangle(bounds)

  // add in distance d = acos( sinφ₁⋅sinφ₂ + cosφ₁⋅cosφ₂⋅cosΔλ ) ⋅ R
  const resultsInBoundingBoxWithDistance = resultsInBoundingBox.map(result => {
    const pLat = result.location.lat;
    const pLong = result.location.long;
    const distance = acos(sin(pLat * PI / 180) * sin(lat * PI / 180) + cos(pLat * PI / 180) * cos(lat * PI / 180) * cos(pLong * PI / 180 - long * PI / 180)) * R

    return {
      ...result,
      distance
    }
  })

  // filter for points with distance from bounding circle centre less than radius, and sort
  const resultsWithinCircle = resultsInBoundingBoxWithDistance.filter(result => result.distance < radius).sort((a, b) => a.distance - b.distance);


  return resultsWithinCircle
}

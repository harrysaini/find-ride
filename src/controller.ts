import { Request, Response } from "express"
import { findNearby, updateLocation } from "./service";
import { DriverLocationUpdateRequest, NearbyRequest } from "./types";
import { GenericResponse } from "./utils/genericResponse";
import { HTTP_STATUS, RESPONSE_STATUS } from "./utils/status";


const validate = (obj: Record<string, any> , keys: string[]) => {
  keys.forEach(key => {
    if(!obj[key]) {
      throw new Error(`Undefined ${key}, please send in request`)
    }
  });
}

export const updateLocationReqHandler = async (req: Request, res: Response) => {
  try {
    validate(req.body, ['driverid', 'lat', 'long']);

    const updateData: DriverLocationUpdateRequest = {
      driverId: req.body.driverId,
      lat: req.body.lat,
      long: req.body.long
    }

    const data = await updateLocation(updateData);

    const response = new GenericResponse(RESPONSE_STATUS.SUCCESS, 'Success', data);
    res.json(response);

  } catch(err) {
    console.log(err.stack);
    const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message, null, err);
    res.status(HTTP_STATUS.BAD_REQUEST).send(response);
  }
}


export const getNearbyDriversReqHandler = async (req: Request, res: Response) => {

  try {

    validate(req.query, [ 'lat', 'long']);

    const params: NearbyRequest = {
      lat: Number(req.query.lat as unknown as string),
      long: Number(req.query.long as unknown as string),
      radius: Number(req.query.radius as unknown as string) || 200
    }

    const data = await findNearby(params);

    const response = new GenericResponse(RESPONSE_STATUS.SUCCESS, 'Success', data);
    res.json(response);

  }catch(err) {
    console.log(err.stack);
    const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message, null, err);
    res.status(HTTP_STATUS.BAD_REQUEST).send(response);
  }

}

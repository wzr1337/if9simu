import {NextFunction, Request, Response} from "express";
import * as ifas from "../ifas/auth";
import { Logger } from "../utils/logger";

const deviceDB = {

};

export function clients(req: Request, res: Response, next?: NextFunction) {

  if (!req || req.headers.authorization !== "Basic YXM6YXNwYXNz") {
    return res.sendStatus(403);
  }

  const contype = req.headers["content-type"];
  if (!contype || contype.indexOf("application/json") !== 0) {
    return res.sendStatus(400);
  }

  //// register the device here!!!!
  if (req.body.access_token && req.body.authorization_token && req.body.deviceID) {
    // tslint:disable-next-line: max-line-length
    if (ifas.validateAccessToken(req.params.userName, req.body.access_token) && ifas.validateAuthToken(req.params.userName, req.body.authorization_token)) {
      deviceDB[getKey(req.params.userName, req.body.deviceID)] = true;
      return res.sendStatus(204);
    }
    return res.sendStatus(403);
  } else {
    res.sendStatus(403);
  }
}

function getKey(userName: string, deviceID: string) {
  return `${userName}|${deviceID}`;
}

export function isDeviceRegistered(deviceId: string, userName?: string, userId?: string) {
  Logger.debug(deviceId, userName, userId);
  Logger.debug(JSON.stringify(deviceDB));
  if (!userName && !userId) {
    Logger.error("isDeviceRegistered(): Neither userName nor userId specified");
  }
  return deviceDB[getKey(userName || ifas.getUserNameById(userId), deviceId)];
}

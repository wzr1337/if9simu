import {NextFunction, Request, Response} from "express";
import { v4 } from "uuid";
import { checkPIN, getUserNameByVIN } from "../ifas/auth";
import * as ifop from "../ifop/clients";
import { Logger } from "../utils/logger";

const serviceTokens = {

};

export function authenticate(req: Request, res: Response, next?: NextFunction) {

  if (! req.body.serviceName) {
    Logger.error(`authenticate(): missing serviceName in body`);
    return res.sendStatus(400);
  }

  if (! req.body.pin || ! checkPIN(req.params.userid, req.body.pin) ) {
    return res.sendStatus(403);
  }

  const serviceName = req.body.serviceName;
  const userid = req.params.userid;
  const token = v4();
  serviceTokens[userid] = serviceTokens[userid] || {};
  serviceTokens[userid][serviceName] = serviceTokens[userid][serviceName] || [];
  serviceTokens[userid][serviceName].push(token);
  return res.status(200).json({token});
}

export function checkServiceToken(userId: string, serviceName: string, token: string) {
  // tslint:disable-next-line: max-line-length
  return serviceTokens[userId] && serviceTokens[userId][serviceName] && serviceTokens[userId][serviceName].indexOf(token) !== -1;
}

export function invalidateServiceToken(userId: string, serviceName: string, token: string) {
  // tslint:disable-next-line: max-line-length
  if (!serviceTokens[userId] || !serviceTokens[userId][serviceName] || serviceTokens[userId][serviceName].indexOf(token) === -1) {
    return true; // it is already invalid
  }
  serviceTokens[userId][serviceName].splice(serviceTokens[userId][serviceName].indexOf(token), 1);
  return serviceTokens[userId][serviceName].indexOf(token) === -1;
}

export function validateServiceRequest(req: Request, res: Response, next?: NextFunction) {
  const contype = req.headers["content-type"];
  if (!contype || contype.indexOf("application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json") !== 0) {
    Logger.error(`invalid "content-type" header`);
    return res.sendStatus(400);
  }
  const accept = req.headers.accept;
  if (!accept || accept.indexOf("application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json") !== 0) {
    Logger.error(`invalid "accept" header`);
    return res.sendStatus(400);
  }

  const deviceId = req.headers["x-device-id"] as string;
  if (!deviceId || !ifop.isDeviceRegistered(deviceId, getUserNameByVIN(req.params.VIN))) {
    Logger.error(`invalid "x-device-id" header: ${deviceId}`);
    return res.status(401).json({
      errorDescription: "The credentials supplied are invalid",
      errorLabel: "InvalidCredentials",
    });
  }

  if (!req.headers.authorization || req.headers.authorization.indexOf("Bearer") !== 0) {
    Logger.error(`missing or invalid "authorization" header`);
    return res.status(401).json({
      errorDescription: "The credentials supplied are invalid",
      errorLabel: "InvalidCredentials",
    });
  }
  const at = req.headers.authorization.split("Bearer ")[1];
  if (!at /* check for token validity*/) {
    Logger.error(`invalid access_token`);
    return res.status(401).json({
      errorDescription: "The credentials supplied are invalid",
      errorLabel: "InvalidCredentials",
    });
  }

  if (!true /*VIN does not belong to user*/) {
    Logger.error(`invalid user/VIN pair`);
    return res.status(401).json({
      errorDescription: "The credentials supplied are invalid",
      errorLabel: "InvalidCredentials",
    });
  }

  next();
}

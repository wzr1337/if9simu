import {NextFunction, Request, Response} from "express";
import { getUserIdByVIN } from "../ifas/auth";
import * as ifop from "../ifop/clients";
import { Logger } from "../utils/logger";
import { checkServiceToken, invalidateServiceToken } from "./authenticate";
import { dispatch2Vehicle } from "./serviceDispatcher";


function initiateService(vin, serviceName, serviceToken) {
  const userId = getUserIdByVIN(vin);
  if (!serviceToken || !checkServiceToken(userId, serviceName , serviceToken)) {
    Logger.error(`invalid serviceToken`);
    return {status: 401, serviceStatus: {
      errorDescription: "The credentials supplied are invalid",
      errorLabel: "InvalidCredentials",
    }};
  }
  const serviceStatus = dispatch2Vehicle(serviceName, vin);
  invalidateServiceToken(userId, serviceName , serviceToken); // invalidate token after use
  return {status: 200, serviceStatus};
}

export function lock(req: Request, res: Response, next?: NextFunction) {
  const serviceName = "RDL";
  const vin = req.params.VIN;
  const serviceToken = req.body.token;
  const invocation = initiateService(vin, serviceName, serviceToken);
  return res.status(invocation.status).json(invocation.serviceStatus);
}

export function unlock(req: Request, res: Response, next?: NextFunction) {
  const serviceName = "RDU";
  const vin = req.params.VIN;
  const serviceToken = req.body.token;
  const invocation = initiateService(vin, serviceName, serviceToken);
  return res.status(invocation.status).json(invocation.serviceStatus);
}

export function hblf(req: Request, res: Response, next?: NextFunction) {
  const serviceName = "HBLF";
  const vin = req.params.VIN;
  const serviceToken = req.body.token;
  const invocation = initiateService(vin, serviceName, serviceToken);
  return res.status(invocation.status).json(invocation.serviceStatus);
}

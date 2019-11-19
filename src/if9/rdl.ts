import {NextFunction, Request, Response} from "express";
import { dispatch2Vehicle } from "./serviceDispatcher";
import { Logger } from "../utils/logger";

export function lock(req: Request, res: Response, next?: NextFunction) {
  checkRequest(req, res);
  if (res.statusCode >= 400) { return; }

  res.json(dispatch2Vehicle("RDL", req.params.VIN));
}

export function unlock(req: Request, res: Response, next?: NextFunction) {
  checkRequest(req, res);
  if (res.statusCode >= 400) { return; }

  res.json(dispatch2Vehicle("RDU", req.params.VIN));
}

function checkRequest(req: Request, res: Response) {

  const contype = req.headers["content-type"];
  if (!contype || contype.indexOf("application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json") !== 0) {
    return res.sendStatus(400);
  }
  const accept = req.headers.accept;
  if (!accept || accept.indexOf("application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json") !== 0) {
    return res.sendStatus(400);
  }

  if (!req.headers["x-requestor"] || req.headers["x-requestor"] !== "jlr") {
    return res.sendStatus(400);
  }

  if (!req.headers.authorization || req.headers.authorization.indexOf("Bearer") !== 0) {
    return res.status(401).json({
      errorDescription: "The credentials supplied are invalid",
      errorLabel: "InvalidCredentials",
    });
  }
  const at = req.headers.authorization.split("Bearer ")[1];
  if (!at /* check for token validity*/) {
    return res.status(401).json({
      errorDescription: "The credentials supplied are invalid",
      errorLabel: "InvalidCredentials",
    });
  }
  const serviceToken = req.body.token;
  if (!serviceToken || serviceToken/* check for token validity*/) {
    return res.sendStatus(400);
  }

  if (!true /*VIN does not belong to user*/) {
    return res.status(401).json({
      errorDescription: "The credentials supplied are invalid",
      errorLabel: "InvalidCredentials",
    });
  }

  if (!true /*deviceID does not belong to user*/) {
    return res.status(401).json({
      errorDescription: "The credentials supplied are invalid",
      errorLabel: "InvalidCredentials",
    });
  }
}

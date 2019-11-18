import {NextFunction, Request, Response} from "express";

export function lock(req: Request, res: Response, next?: NextFunction) {
  checkRequest(req, res);
  if (res.statusCode >= 400) { return; }
  /*
Content-Type:application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json
X-Device-Id:{{deviceId}}
X-Requestor:jlr

  */
  res.send("foo");
}

export function unlock(req: Request, res: Response, next?: NextFunction) {
  checkRequest(req, res);
  if (res.statusCode >= 400) { return; }
  /*

Content-Type:application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json
X-Device-Id:{{deviceId}}
X-Requestor:jlr

  */

  /*

  { status: 'Started',
  statusTimestamp: '2019-11-17T20:12:02+0000',
  startTime: '2019-11-17T20:12:02+0000',
  serviceType: 'HBLF',
  failureDescription: '',
  customerServiceId: '3497978842_1574021522259_21_@NGTP',
  vehicleId: 'SADFA2AN2J1Z23299',
  active: true,
  initiator: 'USER',
  eventTrigger: null,
  serviceCommand: null,
  serviceParameters: null }

  => nur mit gültigem RDL service token

  */
  res.send("foo");
}

function checkRequest(req: Request, res: Response) {
  const contype = req.headers["content-type"];
  if (!contype || contype.indexOf("application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json") !== 0) {
    return res.sendStatus(400);
  }
  const accepttype = req.headers["accept-type"];
  if (!accepttype || accepttype.indexOf("application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json") !== 0) {
    return res.sendStatus(400);
  }

  if (!req.headers.authorization || req.headers.authorization.indexOf("Bearer") !== 0) {
    return res.status(401).json({
      errorDescription: "The credentials supplied are invalid",
      errorLabel: "InvalidCredentials",
    });
  }
  const at = req.headers.authorization.split("Bearer ")[1];
  if (!at) {
    return res.status(401).json({
      errorDescription: "The credentials supplied are invalid",
      errorLabel: "InvalidCredentials",
    });
  }

  if (!true /*VIN does not belong to user*/) {
    return res.status(401).json({
      errorDescription: "The credentials supplied are invalid",
      errorLabel: "InvalidCredentials",
    });
  }
}

import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import {v4} from "uuid";

// json imports
import userDB from "../config/users.json";
import { Logger } from "../utils/logger.js";

// globals
const SECRET = "shhhhh....";
const refreshTokens = {};
const userIdIndex: {[userId: string]: string} = {};
const VINIndex: {[VIN: string]: string} = {};

for (const userName in userDB) {
  if (userDB.hasOwnProperty(userName)) {
    userIdIndex[userDB[userName].userId] = userName;
    for (const vehicle of userDB[userName].vehicles) {
      VINIndex[vehicle.vin] = userName;
    }
  }
}

export function tokens(req: Request, res: Response) {
  const contype = req.headers["content-type"];
  if (!contype || contype.indexOf("application/json") !== 0) {
    return res.sendStatus(400);
  }

  if (!req.body.grant_type || (req.body.grant_type !== "password" && req.body.grant_type !== "refresh_token")) {
    return res.sendStatus(403);
  }

  if (!req.headers.authorization || req.headers.authorization !== "Basic YXM6YXNwYXNz") {
    return res.sendStatus(403);
  }

  if (!req || req.headers.authorization !== "Basic YXM6YXNwYXNz") {
    return res.sendStatus(403);
  }

  let user;

  switch (req.body.grant_type) {
    case "password":
      user = userDB[req.body.username];
      // tslint:disable-next-line: max-line-length
      if (!req.body.username || !req.body.password || !user || user.password !== req.body.password ) {
        res.sendStatus(403);
        return;
      }
      // so we passed all checks.. let go and login..
      userDB[req.body.username] = Object.assign(user, {
        access_token: user.access_token || v4(),
        // tslint:disable-next-line: max-line-length
        authorization_token: user.authorization_token || jwt.sign({ who: "reads this went far", username: user.username}, SECRET),
        refresh_token: user.refresh_token || v4(),
      });

      refreshTokens[userDB[req.body.username].refresh_token] = req.body.username;

      res.status(200).json({
        access_token: user.access_token,
        // tslint:disable-next-line: max-line-length
        authorization_token: user.authorization_token ,
        expires_in: "86400",
        refresh_token: user.refresh_token,
        token_type: "bearer",
      });
      break;
    case "refresh_token":
      // so we passed all checks.. let go and login..
      if (!refreshTokens[req.body.refresh_token]) {
        return res.sendStatus(403);
      }
      user = userDB[refreshTokens[req.body.refresh_token]];
      userDB[req.body.username] = Object.assign(refreshTokens[req.body.refresh_token], {
        access_token: v4(),
        // tslint:disable-next-line: max-line-length
        authorization_token: jwt.sign({ who: "reads this went far", username: user.username}, SECRET),
      });
      res.status(200).json({
        access_token: user.access_token,
        // tslint:disable-next-line: max-line-length
        authorization_token: user.authorization_token ,
        expires_in: "86400",
        refresh_token: user.refresh_token,
        token_type: "bearer",
      });
      break;
  }
}

export function validateAccessToken(username: string, accessToken: string) {
  return userDB[username].access_token === accessToken;
}

export function validateAuthToken(username: string, authorizationToken: string) {
  return userDB[username].authorization_token === authorizationToken;
}

export function checkPIN(userId: string, pin: string) {
  if (!userId) { throw new Error("need a userId"); }
  if (!userIdIndex[userId]) { Logger.error(`UserId ${userId} unknown`); }
  return userIdIndex[userId] && userDB[userIdIndex[userId]].pin === pin;
}

export function getUserNameById(userId: string) {
  return userIdIndex[userId];
}

export function getUserNameByVIN(VIN: string) {
  return VINIndex[VIN];
}

export function getUserIdByVIN(VIN: string) {
  return userDB[VINIndex[VIN]].userId;
}

export function getVehiclesByUserId(userId: string) {
  return userDB[userIdIndex[userId]].vehicles;
}

export function getKnownVINS() {
  return Object.keys(VINIndex);
}

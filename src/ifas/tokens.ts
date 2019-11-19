import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {v4} from "uuid";

const SECRET = "shhhhh....";

import userDB from "../config/users.json";
import { Logger } from "../utils/logger.js";

const refresh_tokens = {

};

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

      refresh_tokens[userDB[req.body.username].refresh_token] = req.body.username;

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
      if (!refresh_tokens[req.body.refresh_token]) {
        return res.sendStatus(403);
      }
      user = userDB[refresh_tokens[req.body.refresh_token]];
      userDB[req.body.username] = Object.assign(refresh_tokens[req.body.refresh_token], {
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

// tslint:disable-next-line: variable-name
export function validateAccessToken(username: string, access_token: string) {
  return userDB[username].access_token === access_token;
}

// tslint:disable-next-line: variable-name
export function validateAuthToken(username: string, authorization_token: string) {
  return userDB[username].authorization_token === authorization_token;
}

import * as express from "express";
import { lock, unlock } from "./rdl";

export const if9Router = express.Router();

if9Router.get("/", (req, res, next) => {
  res.send("ifop"); // our response here
});

if9Router.post("/jlr/vehicles/:VIN/unlock", unlock);
if9Router.post("/jlr/vehicles/:VIN/lock", lock);

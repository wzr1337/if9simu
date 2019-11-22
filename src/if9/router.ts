import * as express from "express";
import { authenticate, validateServiceRequest } from "./authenticate";
import { hblf, lock, unlock } from "./services";
import { getServiceStatus } from "./serviceDispatcher";
import { getVehicles, getVehicleStatus, validateVehicleGETRequest } from "./vehicles";

export const if9Router = express.Router();

if9Router.get("/", (req, res, next) => {
  res.send("ifop"); // our response here
});

if9Router.get("/jlr/users/:userid/vehicles/", validateVehicleGETRequest);
if9Router.get("/jlr/users/:userid/vehicles/", getVehicles);

if9Router.post("/jlr/vehicles/:VIN/users/:userid/authenticate", authenticate);

if9Router.post("/jlr/vehicles/:VIN/*", validateServiceRequest); // use middleware to wash all following requests
if9Router.post("/jlr/vehicles/:VIN/unlock", unlock);
if9Router.post("/jlr/vehicles/:VIN/RDU", unlock);
if9Router.post("/jlr/vehicles/:VIN/lock", lock);
if9Router.post("/jlr/vehicles/:VIN/RDL", unlock);
if9Router.post("/jlr/vehicles/:VIN/honkBlink", hblf);
if9Router.post("/jlr/vehicles/:VIN/hblf", hblf);
if9Router.get("/jlr/vehicles/:VIN/status", getVehicleStatus);
if9Router.get("/jlr/vehicles/:VIN/services/:customerServiceId", getServiceStatus);

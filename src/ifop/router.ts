import * as express from "express";
import { clients } from "./clients";

export const ifOpRouter = express.Router();

ifOpRouter.get("/", (req, res) => {
  res.send("ifop"); // our response here
});

ifOpRouter.post("/jlr/users/:userName/clients", clients);
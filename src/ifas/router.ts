import * as express from "express";
import { tokens } from "./auth";

export const ifasRouter = express.Router();

ifasRouter.get("/", (req, res, next) => {
  res.send("ifas"); // our response here
});

ifasRouter.post("/jlr/tokens", tokens);

import * as bodyParser from "body-parser";
import express from "express";
import { AddressInfo } from "net";
import { if9Router} from "./if9/router";
import { ifasRouter} from "./ifas/router";
import { ifOpRouter} from "./ifop/router";
import { Logger } from "./utils/logger";
import { init as initVehicles, setVehicleStatus } from "./if9/vehicles";

// the app
const app = express();

// config
app.use(bodyParser.json({type: (type) => {
  // tslint:disable-next-line: max-line-length
  return type.headers["content-type"].match(/(\*\/\*)|(application\/.*\+?json)/g); // needed to allow parsing of any json content-type
}}));

// necessary initializations
initVehicles();

// log into console
app.use((req: express.Request, res: express.Response, next?: express.NextFunction) => {
  Logger.info(`${req.method} ${req.url} called`);
  next();
});

app.get("/", (req: express.Request, res: express.Response) => res.json({
    apiDoc: "https://documenter.getpostman.com/view/6250319/RznBMzqo?version=latest#475bbfde-06b2-4677-a188-3f54a36d4321",
    author: "wzr1337",
    greeting: "Hello World I am the IF9 Simulator.",
    purpose: "playground for ConnectedCar: From APIs to Zecurity",
  }));

app.use("/ifas", ifasRouter); // Forwards any requests to the /ifas URI to our ifas Router
app.use("/if9", if9Router); // Forwards any requests to the /ifas URI to our ifas Router
app.use("/ifop", ifOpRouter); // Forwards any requests to the /ifas URI to our ifas Router

const server = app.listen(3333, () => {
  const port = (server.address() as AddressInfo).port;
  // tslint:disable-next-line: max-line-length
  const host = ((server.address() as AddressInfo).address !== "::") ? (server.address() as AddressInfo).port : "127.0.0.1"  ;

  Logger.info(`IF9 Simulator app listening at http://${host}:${port}`);

});

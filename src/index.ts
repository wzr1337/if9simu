import * as bodyParser from "body-parser";
import express from "express";
import { AddressInfo } from "net";
import { if9Router} from "./if9/router";
import { ifasRouter} from "./ifas/router";
import { ifOpRouter} from "./ifop/router";
import { dispatch2Vehicle } from "./if9/serviceDispatcher";


// the app
const app = express();

// config
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/ifas", ifasRouter); // Forwards any requests to the /ifas URI to our ifas Router
app.use("/if9", if9Router); // Forwards any requests to the /ifas URI to our ifas Router
app.use("/ifop", ifOpRouter); // Forwards any requests to the /ifas URI to our ifas Router

const server = app.listen(3333, () => {
  const port = (server.address() as AddressInfo).port;
  // tslint:disable-next-line: max-line-length
  const host = ((server.address() as AddressInfo).address !== "::") ? (server.address() as AddressInfo).port : "127.0.0.1"  ;

  console.log("Example app listening at http://%s:%s", host, port);
  dispatch2Vehicle("RDL", "123456789");

});
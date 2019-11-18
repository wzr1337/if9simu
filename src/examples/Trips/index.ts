  // tslint:disable:no-console
import { getTrips, getUserInformation, login, registerClient } from "../../commands";

import user from "../config.json";

const deviceId = "13371337";

async function run() {
  const ts = Date.now();
  const tokens = await login(user.email, user.password);
  await registerClient(user.email, tokens.access_token, tokens.authorization_token, deviceId);
  await getUserInformation(user.email, deviceId, tokens.access_token);
  const trips = await getTrips(user.VIN, deviceId, tokens.access_token);
  console.dir(trips);
  console.log("took", (Date.now() - ts), "ms");
}

run();

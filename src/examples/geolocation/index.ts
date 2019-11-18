// tslint:disable:no-console
import { getLocation, getUserInformation, login, registerClient } from "../../commands";

import user from "../config.json";

const deviceId = "13371337";

async function run() {
  const tokens = await login(user.email, user.password);
  await registerClient(user.email, tokens.access_token, tokens.authorization_token, deviceId);
  await getUserInformation(user.email, deviceId, tokens.access_token);
  const ts = Date.now();
  const location = await getLocation(user.VIN, deviceId, tokens.access_token);
  console.dir(location);
  console.log("Query took", (Date.now() - ts), "ms");
}

run();

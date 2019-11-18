// tslint:disable:no-console
import { getAttributes, login, registerClient } from "../../commands";

import user from "../config.json";

const deviceId = "13371337";

async function run() {
  const ts = Date.now();
  const tokens = await login(user.email, user.password);
  await registerClient(user.email, tokens.access_token, tokens.authorization_token, deviceId);
  const status = await getAttributes(user.VIN, deviceId, tokens.access_token);
  console.dir(status);
  console.log("took", (Date.now() - ts), "ms");
}

run();

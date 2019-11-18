// tslint:disable:no-console
import { login, registerClient, registerNotificationTargets, vehicleStatus } from "../../commands";

import { Logger } from "../../Logger";
import user from "../config.json";

const deviceId = "DEADBEEF-DEAD-BEEF-DEAD-BEEFDEADBEEF";

async function run() {
  Logger.info("starting..");
  const ts = Date.now();
  try {
    // login the user
    const tokens = await login(user.email, user.password);

    // register the Client in general
    await registerClient(user.email, tokens.access_token, tokens.authorization_token, deviceId);

    // register the Client for all the notifictaion targets
    await registerNotificationTargets(user.VIN, deviceId, tokens.access_token);

    // listen for status updates
    vehicleStatus(user.email, deviceId, tokens.access_token, [user.VIN]).subscribe((data: any) => {
     console.dir(data);
    });
    Logger.info("took", (Date.now() - ts), "ms");
  } catch (error) {
    Logger.error(error.message);
  }
}

run();

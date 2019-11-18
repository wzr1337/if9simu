// tslint:disable:no-console
import { getUserInformation, getVehicleList, login, registerClient, startEngine, unlockVehicle} from "../../commands";

import user from "../config.json";

const deviceId = "13371337";

async function run() {
  const ts = Date.now();
  const tokens = await login(user.email, user.password);
  await registerClient(user.email, tokens.access_token, tokens.authorization_token, deviceId);
  const userInfo = await getUserInformation(user.email, deviceId, tokens.access_token);
  const vehicles = await getVehicleList(userInfo.userId, deviceId, tokens.access_token);
  console.log("Vehicles:", vehicles);
  const status = await unlockVehicle(user.VIN, userInfo.userId, user.pin, deviceId, tokens.access_token);
  console.log(status);
  const engineStart = await startEngine(user.VIN, userInfo.userId, user.pin, deviceId, tokens.access_token);
  console.log(engineStart);
  console.log("took", (Date.now() - ts), "ms");
}

run();

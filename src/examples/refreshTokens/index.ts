// tslint:disable:no-console
import { login, refreshTokens } from "../../commands";

import user from "../config.json";

const deviceId = "13371337";

async function run() {
  const ts = Date.now();
  const tokens = await login(user.email, user.password);
  const newTokens = await refreshTokens(tokens.refresh_token);
  console.dir(newTokens);
  console.log("took", (Date.now() - ts), "ms");
}

run();

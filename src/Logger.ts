export class Logger {

  public static error(...args: any[]) {
    // tslint:disable-next-line:no-console
    console.log("\x1b[31m[Error]\x1b[0m", new Date(Date.now()), ...args);
  }

  public static success(...args: any[]) {
    // tslint:disable-next-line:no-console
    console.log("\x1b[32m[Success]\x1b[0m", new Date(Date.now()), ...args);
  }

  public static info(...args: any[]) {
    // tslint:disable-next-line:no-console
    console.log("\x1b[33m[Info]\x1b[0m", new Date(Date.now()), ...args);
  }

  public static debug(...args: any[]) {
    // tslint:disable-next-line:no-console
    console.log("\x1b[34m[Debug]\x1b[0m", new Date(Date.now()), ...args);
  }
}

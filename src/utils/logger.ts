function getTimeStamp(dt: Date) {
  return `${dt.getFullYear().toString().padStart(4, "0")}-${
    (dt.getMonth() + 1).toString().padStart(2, "0")}-${
    dt.getDate().toString().padStart(2, "0")} ${
    dt.getHours().toString().padStart(2, "0")}:${
    dt.getMinutes().toString().padStart(2, "0")}:${
    dt.getSeconds().toString().padStart(2, "0")}.${
    dt.getMilliseconds().toString().padStart(3, "0")}`;
}

export class Logger {

  public static error(scope?: string, ...args: any[]) {
    // tslint:disable-next-line: no-console
    console.log(`\x1b[31m[Error]\x1b[0m [${getTimeStamp(new Date(Date.now()))}]`, scope, ...args);
  }

  public static success(scope?: string, ...args: any[]) {
    // tslint:disable-next-line: no-console
    console.log(`\x1b[32m[Success]\x1b[0m [${getTimeStamp(new Date(Date.now()))}]`, scope, ...args);
  }

  public static info(scope?: string, ...args: any[]) {
    // tslint:disable-next-line: no-console
    console.log(`\x1b[33m[Info]\x1b[0m [${getTimeStamp(new Date(Date.now()))}]`, scope, ...args);
  }

  public static debug(scope?: string, ...args: any[]) {
    // tslint:disable-next-line: no-console
    console.log(`\x1b[34m[Debug]\x1b[0m [${getTimeStamp(new Date(Date.now()))}]`, scope, ...args);
  }
}

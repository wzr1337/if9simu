import { Logger } from "./logger";

describe("Logger utility", () => {

  it ("should log info messages", () => {
    Logger.info("foo");
    jest.spyOn(console, "log");
  });

  it ("should log debug messages", () => {
    Logger.debug("foo");
    jest.spyOn(console, "log");
  });

  it ("should log error messages", () => {
    Logger.error("foo");
    jest.spyOn(console, "log");
  });

  it ("should log success messages", () => {
    Logger.success("foo");
    jest.spyOn(console, "log");
  });
});

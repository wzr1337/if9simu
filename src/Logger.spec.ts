// tslint:disable:no-console
import { Logger } from "./Logger";

it("should log debug messages", () => {
  Logger.debug("testing");
  expect(console.log).toHaveBeenCalled();
});

it("should log error messages", () => {
  Logger.error("testing");
  expect(console.log).toHaveBeenCalled();
});

it("should log info messages", () => {
  Logger.info("testing");
  expect(console.log).toHaveBeenCalled();
});

it("should log success messages", () => {
  Logger.success("testing");
  expect(console.log).toHaveBeenCalled();
});

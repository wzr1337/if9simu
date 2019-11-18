import { DivisionByZeroError } from "./errors";

describe("The mathmagic module", () => {

  it("should have a default message", () => {
    const err = new DivisionByZeroError();
    expect(err.message).toBe("You can not divide by 0");
  });

  it("should allow a custom message", () => {
    const err = new DivisionByZeroError("foo");
    expect(err.message).toBe("foo");
  });

  it("should have an error code", () => {
    const err = new DivisionByZeroError("foo");
    expect(err.code).toBe(1337);
    expect(err.code).not.toBe(42);
  });

});

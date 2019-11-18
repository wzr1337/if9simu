export class DivisionByZeroError extends Error {

  constructor(m: string = "You can not divide by 0") {
      super(m);
      this.name = "DivisionByZeroError";
      // Set the prototype explicitly.
      Object.setPrototypeOf(this, DivisionByZeroError.prototype);
  }

  public get code(): number {
    return 1337;
  }
}

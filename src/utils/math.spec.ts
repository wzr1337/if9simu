import { getRandomInt } from "./math";

describe("The Math Utile", () => {
  it("getRandomInt should return an integer between 50 and 200", () => {
    const int = getRandomInt(200, 50);
    expect(int).toBeLessThanOrEqual(200);
    expect(int).toBeGreaterThanOrEqual(50);
    expect(Math.floor(int)).toBe(int);
  });

  it("getRandomInt should return an integer between 0 and 1 by default", () => {
    const int = getRandomInt(1);
    expect(int).toBeLessThanOrEqual(1);
    expect(int).toBeGreaterThanOrEqual(0);
    expect(Math.floor(int)).toBe(int);
  });

  it("getRandomInt should return an integer between -100 and -99 by default", () => {
    const int = getRandomInt(-99, -100);
    expect(int).toBeLessThanOrEqual(-99);
    expect(int).toBeGreaterThanOrEqual(-100);
    expect(Math.floor(int)).toBe(int);
  });

  it("getRandomInt should return an integer between -100 and -99 by default", () => {
    try {
      getRandomInt(0, 10);
    } catch (error) {
      expect(true).toBeTruthy(); // expedct execption to be thrown
    }
  });
});

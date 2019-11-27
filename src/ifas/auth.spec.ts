import MockExpressRequest from "mock-express-request";
import MockExpressResponse from "mock-express-response";

import userDB from "../config/users.json";
import auth = require("./auth");

// Basic Setup
let options;
let optionsWrongPassword;

beforeEach(() => {
  options = {
    body: {
      grant_type : "password",
      password : userDB["ansgerl@gmail.com"].password,
      username : "ansgerl@gmail.com",
    },
    headers: {
      "authorization" : "Basic YXM6YXNwYXNz",
      "connection"  : "close",
      "content-type" : "application/json",
      "x-Device-Id" : userDB["ansgerl@gmail.com"].deviceID,
    },
  };

  optionsWrongPassword = {
    body: {
      grant_type : "password",
      password : "wrong_password",
      username : "ansgerl@gmail.com",
    },
    ...options.headers,
  };
});

describe("TEST auth", () => {

  it("should initialize", () => {
    auth.init();
  });

  it("should know VINS", () => {
    auth.init();
    expect(auth.getKnownVINS().length).toBeGreaterThan(0);
  });

  it("should get username by vin", () => {
    auth.init();
    expect(auth.getUserNameByVIN(userDB["ansgerl@gmail.com"].vehicles[0].vin)).toBe("ansgerl@gmail.com");
  });

  it("should get username by userId", () => {
    auth.init();
    expect(auth.getUserNameById(userDB["ansgerl@gmail.com"].userId)).toBe("ansgerl@gmail.com");
  });

  it("should get userId by vin", () => {
    auth.init();
    expect(auth.getUserIdByVIN(userDB["ansgerl@gmail.com"].vehicles[0].vin)).toBe(userDB["ansgerl@gmail.com"].userId);
  });

  it("should get vehicles by userId", () => {
    auth.init();
    expect(auth.getVehiclesByUserId(userDB["ansgerl@gmail.com"].userId).length).toBeGreaterThan(0);
  });

  it("should check PIN", () => {
    auth.init();
    expect(auth.checkPIN(userDB["ansgerl@gmail.com"].userId, userDB["ansgerl@gmail.com"].pin)).toBeTruthy();
    expect(auth.checkPIN(userDB["ansgerl@gmail.com"].userId, "")).toBeFalsy();
  });

  it("should reject queries to /ifas/jlr/tokens with missing content type header", () => {
    const opts = options;
    opts.headers["content-type"] = "";

    const req = new MockExpressRequest(opts);
    const res = new MockExpressResponse();

    const spySendStatus = jest.spyOn(res, "sendStatus");
    auth.tokens(req, res);
    expect(spySendStatus).toHaveBeenCalled();
    expect(res.statusCode).toBe(400);
  });

  it("should reject queries to /ifas/jlr/tokens with missing wrong grant type", () => {
    const opts = options;
    opts.body.grant_type = "thisisallwrong@$hyte";

    const req = new MockExpressRequest(opts);
    const res = new MockExpressResponse();

    const spySendStatus = jest.spyOn(res, "sendStatus");
    auth.tokens(req, res);
    expect(spySendStatus).toHaveBeenCalled();
    expect(res.statusCode).toBe(403);
  });

  it("should respond properly to /ifas/jlr/tokens queries", () => {
    const req = new MockExpressRequest(options);
    const res = new MockExpressResponse();

    const spyJson = jest.spyOn(res, "json");

    auth.tokens(req, res);
    const result = res._getJSON();

    expect(result).toHaveProperty("authorization_token");
    expect(result).toHaveProperty("access_token");
    expect(result).toHaveProperty("expires_in");
    expect(result).toHaveProperty("refresh_token");
    expect(result).toHaveProperty("token_type");

    expect(spyJson).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);

  });

  test("TEST /ifas/jlr/tokens wrong password", () => {
    const req = new MockExpressRequest(optionsWrongPassword);
    const res = new MockExpressResponse();

    const spySendStatus = jest.spyOn(res, "sendStatus");
    auth.tokens(req, res);

    expect(spySendStatus).toHaveBeenCalledWith(403);
    expect(res.statusCode).toBe(403);

  });

  test("TEST /ifas/jlr/tokens no Attributes", () => {
    const req = new MockExpressRequest();
    const res = new MockExpressResponse();

    const spySendStatus = jest.spyOn(res, "sendStatus");
    auth.tokens(req, res);

    expect(spySendStatus).toHaveBeenCalledWith(400);
    expect(res.statusCode).toBe(400);
  });
});

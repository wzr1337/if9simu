import MockExpressRequest from "mock-express-request";
import MockExpressResponse from "mock-express-response";

import userDB from "../config/users.json";
import auth = require("./auth");

// Basic Setup

const options = {
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

const optionsWrongPassword = {
  body: {
    grant_type : "password",
    password : "wrong_password",
    username : "ansgerl@gmail.com",
  },
  ...options.headers,
};

describe("TEST auth", () => {

  test("TEST /ifas/jlr/tokens", () => {
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

    expect(spySendStatus).toHaveBeenCalledWith(403);
    expect(res.statusCode).toBe(403);
  });
});

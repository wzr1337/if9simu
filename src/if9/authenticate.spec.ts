import MockExpressRequest from "mock-express-request";
import MockExpressResponse from "mock-express-response";

import userDB from "../config/users.json";
import { init } from "../ifas/auth";

import auth = require("../ifas/auth");
import clients = require("../ifop/clients");
import authenticate = require("./authenticate");

// Basic Setup
let options;
let rdl;
let rdlOptions;

beforeEach(() => {

  init();

  options = {
    body: {
      pin : userDB["ansgerl@gmail.com"].pin,
      serviceName:  "RDL",
    },
    headers: {
      "content-type" : "application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v2+json",
      "x-Device-Id" : userDB["ansgerl@gmail.com"].deviceID,
    },
    params: {
      VIN : "SALWA2AK8KA868854",
      userid: "DEAD000BEAF",
    },
  };

});

describe("TEST authenticate", () => {

  it("should return a new RDL Service token", () => {

    const req = new MockExpressRequest(options);
    const res = new MockExpressResponse();

    authenticate.authenticate(req , res);
    const result = res._getJSON();

    expect(result.token).toHaveLength(36);
    expect(result).toHaveProperty("token");
    expect(res.statusCode).toBe(200);
  });

  it("should reject req with invalid userId", () => {
    const falseOpts = options;
    falseOpts.params.userid = "WrongUser";

    const req = new MockExpressRequest(falseOpts);
    const res = new MockExpressResponse();

    authenticate.authenticate(req , res);
    expect(res.statusCode).toBe(403);
  });

  it("should reject req with invalid pin", () => {
    const falseOpts = options;
    falseOpts.body.pin = "FalsePin";

    const req = new MockExpressRequest(falseOpts);
    const res = new MockExpressResponse();

    const spyCheckPin = jest.spyOn(auth, "checkPIN");

    authenticate.authenticate(req , res);

    expect(spyCheckPin).toHaveBeenCalled();
    expect(spyCheckPin).toHaveReturnedWith(false);

    expect(res.statusCode).toBe(403);
  });
});

describe("TEST validateServiceRequest", () => {

  beforeEach(() => {

    const res = new MockExpressResponse();
    authenticate.authenticate(new MockExpressRequest(options) , res);
    rdl = res._getJSON().token;

    rdlOptions = {
      body: {
        token: rdl,
      },
      headers: {
        // Note docu show no accept header
        "accept" : "application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json",
        // NOTE: docu shows no authorization header
        "authorization": "Bearer someToken",
        // NOTE: Docu shows content-type ...v2+json
        "content-type" : "application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json",
        "x-device-id" : userDB["ansgerl@gmail.com"].deviceID,
        // NOTE: docu shows no x-requestor header
        "x-requestor" : "jlr",
      },
      params: {
        VIN : "SALWA2AK8KA868854",
      },
    };
  });

  it("should call next function", () => {
    const next = jest.fn();

    const req = new MockExpressRequest(rdlOptions);
    const res = new MockExpressResponse();

    const spyVIN = jest.spyOn(clients, "isDeviceRegistered");
    spyVIN.mockReturnValueOnce(true);

    authenticate.validateServiceRequest(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should not call next function with a invalid VIN", () => {
    const next = jest.fn();

    const req = new MockExpressRequest({
      ...rdlOptions,
      params : {VIN: "InvalidVIN"},
    });

    const res = new MockExpressResponse();
    const spyVIN = jest.spyOn(clients, "isDeviceRegistered");

    authenticate.validateServiceRequest(req, res, next);

    expect(spyVIN).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("should not call next function with false accept header", () => {
    const next = jest.fn();

    const req = new MockExpressRequest({
      ...rdlOptions,
      headers: {
        ...rdlOptions.header,
        accept : "wrongAccept",
      },
    });

    const res = new MockExpressResponse();

    authenticate.validateServiceRequest(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("should not call next function with false content-type header", () => {
    const next = jest.fn();

    const req = new MockExpressRequest({
      ...rdlOptions,
      headers: {
        ...rdlOptions.header,
        "content-type" : "application/json",
      },
    });

    const res = new MockExpressResponse();

    authenticate.validateServiceRequest(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(next).not.toHaveBeenCalled();
  });
});

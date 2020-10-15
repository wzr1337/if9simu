import MockExpressRequest from "mock-express-request";
import MockExpressResponse from "mock-express-response";

import userDB from "../config/users.json";
import auth = require("../ifas/auth");
import clients = require("./clients");

 // Basic Setup

const basicOptions = {
  headers: {
// OPTIMIZE:  docu shows only content-type, connection and x-Device-Id header
    "authorization" : "Basic YXM6YXNwYXNz",
    "connection"  : "close",
    "content-type" : "application/json",
    "x-Device-Id" : userDB["ansgerl@gmail.com"].deviceID,
  },
};

const optionsAuthReq = {
  ...basicOptions,
  body: {
    grant_type : "password",
    password : userDB["ansgerl@gmail.com"].password,
    username : "ansgerl@gmail.com",
  },
};

const authReq = new MockExpressRequest(optionsAuthReq);
const authRes = new MockExpressResponse();

auth.tokens(authReq, authRes);
const authBody = authRes._getJSON();

// Client Tests
describe("TEST clients", () => {

  const spyAccesToken = jest.spyOn(auth, "validateAccessToken");
  const spyAuthToken = jest.spyOn(auth, "validateAuthToken");

  test("/jlr/users/ansgerl@gmail.com/clients", () => {

    const options = {
      ...basicOptions,
      body : {
        access_token : authBody.access_token,
        authorization_token : authBody.authorization_token,
        deviceID : userDB["ansgerl@gmail.com"].deviceID,
        expires_in : authBody.expires_in,
      },
      params: { userName: "ansgerl@gmail.com" },
    };

    const req = new MockExpressRequest(options);
    const res = new MockExpressResponse();

    clients.clients(req, res);

    expect(spyAccesToken).toHaveBeenCalledWith(req.params.userName, authBody.access_token);
    expect(spyAccesToken).toHaveReturnedWith(true);

    expect(spyAuthToken).toHaveBeenCalledWith(req.params.userName, authBody.authorization_token);
    expect(spyAuthToken).toHaveReturnedWith(true);

    expect(res.statusCode).toBe(204);

  });

  test("/jlr/users/ansgerl@gmail.com/clients invalid accessToken", () => {
    const options = {
      ...basicOptions,
      body : {
        access_token : "invalid_accees_token",
        authorization_token : authBody.authorization_token,
        deviceID : userDB["ansgerl@gmail.com"].deviceID,
        expires_in : authBody.expires_in,
      },
      params: { userName: "ansgerl@gmail.com" },
    };

    const req = new MockExpressRequest(options);
    const res = new MockExpressResponse();

    clients.clients(req, res);

    expect(spyAccesToken).toHaveBeenCalledWith(req.params.userName, "invalid_accees_token");
    expect(spyAccesToken).toHaveReturnedWith(false);

    expect(res.statusCode).toBe(403);
  });

  xtest("/jlr/users/ansgerl@gmail.com/clients no Attributes", () => {
    const req = new MockExpressRequest();
    const res = new MockExpressResponse();

    try {
      clients.clients(req, res);
    } catch {
      // failing is expected
      expect(res.statusCode).toBe(403);
    }
  });
});

import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export function mockRequest(options) {
  return {
    get(name) {
      if (name === "authorization") { return options.headers.authorization; }
      return null;
    },
    body: options.body,
    headers: options.headers,
  } as Request<ParamsDictionary>;
}

export function mockResponse(options) {
  const res: any = {};
  res.headers = options.headers;
  res.status = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
}

import { mockRequest, mockResponse } from "../__mocks__/express";
import { tokens } from "./auth";

describe("Issue tokens", () => {
  test("should ...", async () => {
    const req = mockRequest({
      headers: {"content-type": "application/json"},
      // tslint:disable-next-line: object-literal-sort-keys
      body: {grant_type: "password"},
    });
    const res = mockResponse({});
    await tokens(req, res);
    expect(res.sendStatus).toBeCalled();
  });
});

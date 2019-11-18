// tslint:disable object-literal-sort-keys max-line-length no-duplicate-string
import { StompFrame } from "./stomp";

it("should report its version", () => {
  expect(StompFrame.version).toBe("1.2");
});

it("should compose a CONNECT frame correctly", () => {
  const msg = StompFrame.toFrame({command: "CONNECT", headers: {"heart-beat": "5000,0"}});
  expect(msg).toBe("CONNECT\nheart-beat:5000,0\n\n\x00");
});

it("should compose a MESSAGE frame with body correctly", () => {
  const msg = StompFrame.toFrame({command: "MESSAGE", headers: {"heart-beat": "5000,0"}, body: "booo to you"});
  expect(msg).toBe("MESSAGE\nheart-beat:5000,0\ncontent-length:11\n\nbooo to you\x00");
});

it("should parse STOMP message frame correctly", () => {
  const frame = StompFrame.fromFrame("CONNECT\nheart-beat:5000,0\n\n\x00");
  expect(frame).toEqual({command: "CONNECT", headers: {"heart-beat": "5000,0"}});
});

it("should parse an invalid STOMP message frame to undefined", () => {
  const frame = StompFrame.fromFrame("");
  expect(frame).toBeUndefined();
});

it("should parse STOMP message frame with body correctly", () => {
  const frame = StompFrame.fromFrame("CONNECT\nheart-beat:5000,0\n\nbody\n\x00");
  expect(frame).toEqual({command: "CONNECT", headers: {"heart-beat": "5000,0"}, body: "body"});
});

it("should parse STOMP message frame with multiline body correctly", () => {
  const frame = StompFrame.fromFrame("CONNECT\nheart-beat:5000,0\n\nbodyline1\nbodyline2\n\x00");
  expect(frame).toEqual({command: "CONNECT", headers: {"heart-beat": "5000,0"}, body: "bodyline1\nbodyline2"});
});

it("should parse STOMP message frame with JSON body correctly", () => {
  const frame = StompFrame.fromFrame('CONNECT\nheart-beat:5000,0\n\n{"foo":"bar"}\n\x00');
  expect(frame).toEqual({command: "CONNECT", headers: {"heart-beat": "5000,0"}, body: '{"foo":"bar"}'});
});

it("should parse STOMP SubscriptionRejected frame with JSON body correctly", () => {
  const frame = StompFrame.fromFrame("MESSAGE\n"
  + "expires:0\n"
  + "destination:/user/topic/DEVICE.13371337\n"
  + "subscription:sub-0\n"
  + "priority:4\n"
  + "message-id:ID\cip-172-17-50-244.eu-west-1.compute.internal-43643-1540213744233-5\c1\c-1\c1\c28090\n"
  + "content-type:application/json;charset=UTF-8\n"
  + "timestamp:1543496394327\n"
  + "content-length:103\n"
  + "\n"
  + '{"messageType":"SubscriptionRejected","vin":"SADFA2AN2J1Z23299","errorMessage":"Subscription REJECTED"}'
  + "\x00");
  expect(frame).toEqual({command: "MESSAGE", headers: {
    "expires": "0",
    "timestamp": "1543496394327",
    "destination": "/user/topic/DEVICE.13371337",
    "subscription": "sub-0",
    "priority": "4",
    "message-id": "ID\cip-172-17-50-244.eu-west-1.compute.internal-43643-1540213744233-5\c1\c-1\c1\c28090",
    "content-type": "application/json;charset=UTF-8",
    "content-length": "103",
    },
    body: '{\"messageType\":\"SubscriptionRejected\",\"vin\":\"SADFA2AN2J1Z23299\",\"errorMessage\":\"Subscription REJECTED\"}',
  });
});

// tslint:disable:object-literal-sort-keys variable-name max-union-size no-duplicate-string cognitive-complexity max-line-length
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Subject } from "rxjs";
import WebSocket = require("ws");
import { Logger } from "../Logger";
import { IAttributes, IEventStatus, IGeoLocation, ITrip, IVehicle, IVehicleStatus, IWaypoint } from "../types";
import { addSpeedToWaypointList, convertoCamelCase, StompFrame } from "../utils";
import { IF9_BASEURI } from "./constants";

export async function authenticateRequest(deviceId: string, access_token: string, pin: string, vin: string,
                                          userId: string, serviceName: "RDU"|"RDL"|"VHS"|"REON"|"REOFF"|"HBLF") {
  const eventTokenConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.AuthenticateRequest-v2+json",
      "Accept": "application/json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };
  const eventTokenBody = {
    pin,
    serviceName,
  };
  let eventTokenresponse: AxiosResponse;
  try {
    eventTokenresponse = await axios.post(`${IF9_BASEURI}/jlr/vehicles/${vin}/users/${userId}/authenticate`,
    eventTokenBody, eventTokenConfig);
  } catch (error) {
    Logger.error(error);
    throw new Error("Cannot obtain eventToken");
  }
  return eventTokenresponse.data.token;
}

/**
 * Fetch the list of all vehicles assigned to the given user
 *
 * @export
 * @param {string} userId the users id
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {(Promise<IVehicle[]>)}
 */
export async function getVehicleList(userId: string, deviceId: string, access_token: string): Promise<IVehicle[]> {

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };

  let response: AxiosResponse;
  response = await axios.get(`${IF9_BASEURI}/jlr/users/${userId}/vehicles/`, config);
  return response.data.vehicles as IVehicle[];
}

/**
 * This method unlocks a vehicle
 *
 * @export
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} userId the users id
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @param {string} pin the users PIN code
 * @returns {Promise<IEventStatus>}
 */
export async function unlockVehicle(vin: string, userId: string, pin: string, deviceId: string, access_token: string): Promise<IEventStatus> {

  const token = await authenticateRequest(deviceId, access_token, pin, vin, userId, "RDU");

  const unlockConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json",
      "Accept": "application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };

  const unlockBody = {
    token,
  };

  let response: AxiosResponse;
  response = await axios.post(`${IF9_BASEURI}/jlr/vehicles/${vin}/unlock`, unlockBody, unlockConfig);
  return response.data as IEventStatus;
}

/**
 * This method locks a vehicle
 *
 * @export
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} userId the users id
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @param {string} pin the users PIN code
 * @returns {Promise<IEventStatus>}
 */
export async function lockVehicle(vin: string, userId: string, pin: string, deviceId: string,
                                  access_token: string): Promise<IEventStatus> {

  const token = await authenticateRequest(deviceId, access_token, pin, vin, userId, "RDL");

  const lockConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json",
      "Accept": "application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };

  const lockBody = {
    token,
  };

  let response: AxiosResponse;
  response = await axios.post(`${IF9_BASEURI}/jlr/vehicles/${vin}/lock`, lockBody, lockConfig);
  return response.data as IEventStatus;
}

/**
 * This method starts the vehicles engine
 *
 * @export
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} userId the users id
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @param {string} pin the users PIN code
 * @returns {Promise<IEventStatus>}
 */
export async function startEngine(vin: string, userId: string, pin: string, deviceId: string, access_token: string): Promise<IEventStatus> {

  const token = await authenticateRequest(deviceId, access_token, pin, vin, userId, "REON");

  const lockConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json",
      "Accept": "application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };

  const lockBody = {
    token,
  };

  let response: AxiosResponse;
  response = await axios.post(`${IF9_BASEURI}/jlr/vehicles/${vin}/engineOn`, lockBody, lockConfig);
  return response.data as IEventStatus;
}

/**
 * This method stops the vehicles engine
 *
 * @export
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} userId the users id
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @param {string} pin the users PIN code
 * @returns {Promise<IEventStatus>}
 */
export async function stopEngine(vin: string, userId: string, pin: string, deviceId: string, access_token: string): Promise<IEventStatus> {

  const token = await authenticateRequest(deviceId, access_token, pin, vin, userId, "REOFF");

  const lockConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json",
      "Accept": "application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };

  const lockBody = {
    token,
  };

  let response: AxiosResponse;
  response = await axios.post(`${IF9_BASEURI}/jlr/vehicles/${vin}/engineOff`, lockBody, lockConfig);
  return response.data as IEventStatus;
}

/**
 * get the current status of a request filed with the backend
 * Each {IEventStatus} will give you a customerServiceId
 *
 * @export
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} userId the users id
 * @param {string} customerServiceId the requests Id
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {Promise<IEventStatus>}
 */
export async function ServiceRequestRISM(vin: string, customerServiceId: string, deviceId: string,
                                         access_token: string): Promise<IEventStatus> {
  const RISMserviceConfig: AxiosRequestConfig = {
    headers: {
      "Accept": "application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };

  let response: AxiosResponse;
  response = await axios.get(`${IF9_BASEURI}/jlr/vehicles/${vin}/services/${customerServiceId}`, RISMserviceConfig);
  return response.data as IEventStatus;
}

/**
 * Update the vehicle status on the backend. This method need to be called to
 * update wireless Cars database of last known vehilce status
 *
 * @export
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} userId the users id
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {Promise<IEventStatus>}
 */
export async function updateVehicleStausOnBackend(vin: string, userId: string, deviceId: string,
                                                  access_token: string): Promise<IEventStatus> {

  const token = await authenticateRequest(deviceId, access_token, undefined, vin, userId, "VHS");

  const statusUpdateConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json",
      "Accept": "application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };
  const statusUpdateBody = {
    token,
  };
  let response: AxiosResponse;
  response = await axios.post(`${IF9_BASEURI}/jlr/vehicles/${vin}/healthstatus`, statusUpdateBody, statusUpdateConfig);
  return response.data as IEventStatus;
}

/**
 * Gets the current status of the vehicle
 *
 * to update the wireless car databse to reflect the current state,
 * call updateVehicleStausOnBackend() before
 *
 * @export
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} userId the users id
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {Promise<IVehicleStatus>}
 */
export async function getStatus(vin: string, userId: string, deviceId: string,
                                access_token: string): Promise<IVehicleStatus> {

  const config: AxiosRequestConfig = {
    headers : {
      "Authorization": "Bearer " + access_token,
      "Accept": "application/vnd.ngtp.org.if9.healthstatus-v3+json",
      "Content-Type": "application/json;charset=UTF-8",
      "X-Device-Id": deviceId,
      "X-Requestor": "jlr",
    },
  };

  let response: AxiosResponse;
  response = await axios.get(`${IF9_BASEURI}/jlr/vehicles/${vin}/status`, config);

  return parseStatus(response.data);
}

function parseStatus(data: any) {
  const resp: IVehicleStatus = {} as IVehicleStatus;
  resp.lastUpdatedTime = data.lastUpdatedTime;
  const vehicleState = data.vehicleStatus;
  const vehicleAlerts = data.vehicleAlerts;
  // cleanup the API repsonse
  // coreStatus
  resp.vehicleStatus = { coreStatus: {}, evStatus: {} };
  if (vehicleState) {

    if (vehicleState.coreStatus) {
      for (const element of vehicleState.coreStatus) {
        resp.vehicleStatus.coreStatus[convertoCamelCase(element.key)] = element.value;
      }
    }

    if (vehicleState.evStatus) {
      for (const element of vehicleState.evStatus) {
        resp.vehicleStatus.evStatus[convertoCamelCase(element.key)] = element.value;
      }
    }
  }
  if (vehicleAlerts) {
    resp.vehicleAlerts = {};
    for (const element of vehicleAlerts) {
      resp.vehicleAlerts[convertoCamelCase(element.key)] = {
        value: element.value,
        lastUpdatedTime: element.lastUpdatedTime,
        isActive: element.active,
      };
    }

  }
  // finally return
  return resp;
}

/**
 * this Methods lets the car beep and flash
 *
 * @export
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} userId the users id
 * @param {string} pin the users pin code
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {Promise<IEventStatus>}
 */
export async function beepAndFlash(vin: string, userId: string, pin: string, deviceId: string,
                                   access_token: string): Promise<IEventStatus> {

  const token = await authenticateRequest(deviceId, access_token, pin, vin, userId, "HBLF");

  const lockConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json",
      "Accept": "application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };

  const lockBody = {
    token,
  };

  let response: AxiosResponse;
  response = await axios.post(`${IF9_BASEURI}/jlr/vehicles/${vin}/HBLF`, lockBody, lockConfig);
  return response.data as IEventStatus;
}

/**
 * Gets you the last known location of a vehicle
 *
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {(Promise<IGeoLocation>)} the location of the vehicle
 */
export async function getLocation(vin: string, deviceId: string, access_token: string): Promise<IGeoLocation> {

  const posConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };

  let response: AxiosResponse;
  response = await axios.get(`${IF9_BASEURI}/jlr/vehicles/${vin}/position`, posConfig);
  return response.data as IGeoLocation;
}
/**
 * fetch the current WebSocket Url from the backend
 *
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {Promise<string>} the websocket url
 */
async function getWebSocketUrl(userName: string, deviceId: string, access_token: string): Promise<string> {

  const getConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
      "Accept": "text/plain",
      "x-telematicsprogramtype": "landroverprogram",
    },
  };

  const response = await axios.get(`${IF9_BASEURI}/jlr/vehicles/${userName}/${deviceId}/getWebsocketURL/2`, getConfig);
  return response.data + "?" + deviceId;
}
/**
 * Subscribe to status updates from the vehicle to the client
 *
 * @export
 * @param {string} userName the user on whos behalf you are registering for updates
 * @param {string} vins a list of vehicle indentifiaction numbers to subscribe to
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {Subject<{}>}
 */
export function vehicleStatus(userName: string, deviceId: string, access_token: string , vins: string[]): Subject<{}> {
  const observable = new Subject();

  getWebSocketUrl(userName, deviceId, access_token).then((brokerURL) => { // first get the current WebSocket endpoint
    const socket = new WebSocket(brokerURL);
    socket.onopen = (evt) => {
      socket.onclose = (closeEvt) => {
        Logger.info("WebSocket was closed with code", closeEvt.code);
      };
      socket.onmessage = (msg) => {
        const stomp = StompFrame.fromFrame(msg.data.toString());
        if (msg.data === "\n") {
          // this was just a heart beat
          Logger.info("<<< PONG");
          socket.send("\n");
        } else {
          switch (stomp.command as string) {
            case "MESSAGE":
              const id = stomp.headers["message-id"];
              const ackFrame = StompFrame.toFrame({
                command: "SEND",
                headers: {
                  destination: "/app/messageReceived",
                },
                body: JSON.stringify({deviceId, messageIds: [id]}),
              });
              socket.send(ackFrame);
              if (stomp.body) {
                observable.next(parseStatusBody(JSON.parse(stomp.body)));
              }
              break;
            case "CONNECTED":
              Logger.info("Connected to STOMP");
              break;
            default:
              Logger.debug(`Unknown message type received ${stomp.command}`);
          }
        }
      };
      socket.onerror = (err) => {
        Logger.error(err.message);
        throw err;
      };

      // first connect on STOMP level.. whyever STOMP was introduced.. hmm.
      const frame = StompFrame.toFrame({
        command: "CONNECT",
        headers: {
          "deviceId": deviceId,
          "heart-beat": "5000,5000",
          "host": "if9-ws.prod-row.jlrmotor.com",
          "Authorization": "Bearer " + access_token,
          "accept-version": "1.1, 1.0",
          userName,
        },
      });
      socket.send(frame);

      // subscribe for the device channel to receive further device related messages
      const subFrame = StompFrame.toFrame({
        command: "SUBSCRIBE",
        headers: {
          destination: "/user/topic/DEVICE." + deviceId,
          id: "deviceSubScription",
          deviceId,
        },
      });
      Logger.debug("device subscribe..");
      socket.send(subFrame);

      // now do the handshake
      const handshakeFrame = StompFrame.toFrame({
        command: "SEND",
        headers: {
          destination: "/app/handshake",
        }, body: JSON.stringify({
          deviceId,
          protocolVersion: 1,
        }),
      });
      Logger.debug("handshaking..");
      socket.send(handshakeFrame);

      // subscribe to all VIN channels to receive further vehicle related messages
      for (const vin of vins) {
        const vinSubscriptionFrame = StompFrame.toFrame({
          command: "SUBSCRIBE",
          headers: {
            destination: "/user/topic/VIN." + vin,
            id: "vinSubscription",
            deviceId,
          },
        });
        Logger.debug("VIN subscribe..");
        socket.send(vinSubscriptionFrame);
      }
    };
  });
  return observable;
}

function parseStatusBody(body) {
  const resp = [];
  if ( Array.isArray(body) && body[0].eid.match(/\w*_\@NGTP/) !== null) {
    for (const element of body) {
      let $obj: any = {};
      if (null !== element.st.match(/^VHS|REON|REOFF|HBLF|RDL|RDU$/)) {
        $obj.statusType = element.st;
        $obj.timestamp = element.t;
        $obj.vin = element.v;
        $obj.data = parseStatus(JSON.parse(element.a.b));
      } else {
        $obj = element;
      }
      resp.push($obj);
    }
  }
  return resp;
}

/**
 * Registers a certain deviceId for noztification targets, such as the WebSocket
 * The call also needs a VIN, as the Notification/deviceId tuple is treated "unique"
 *
 * @export
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {Promise<void>} does not return anything, as the server will not tell us anything
 */
export async function registerNotificationTargets(vin: string, deviceId: string, access_token: string): Promise<void> {

  const regConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.NotificationTargets-v2+json",
      "Accept": "application/json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };

  const regBody: {} = {
    expireAt: (new Date(Date.now() + 864000000)).toISOString(),
    name: "super-heroic-wc-if9-nodeJS-module",
    // tslint:disable-next-line:max-line-length
    services: ["VHS", "SVT", "TN", "UPS", "VHC", "ALOFF", "BCALL", "CI", "ECALL", "HBLF", "JL", "RDL", "RDU", "REOFF", "REON"],
    state: "CONFIRMED",
    uri: `pn:ws:${deviceId}:ce76a9f77ea94536a2652ff344cec7f0ac833c24`,
    websocketProtocolVersion: 2,
  };

  let response: AxiosResponse;
  response = await axios.post(`${IF9_BASEURI}/jlr/vehicles/${vin}/config/notificationTargets`, regBody, regConfig);

  // tslint:disable-next-line:max-line-length
  if (response.status !== 204) { throw new Error("Could not register NotificationTragets, got status " + response.status); }
}

/**
 * Gets you the the vehicles journeys
 *
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {(Promise<ITrip[]>)} the list of trips known for the vehicle
 */
export async function getTrips(vin: string, deviceId: string, access_token: string): Promise<ITrip[]> {

  const posConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };

  let response: AxiosResponse;
  response = await axios.get(`${IF9_BASEURI}/jlr/vehicles/${vin}/trips`, posConfig);
  if (response.status !== 200) { throw new Error("Backend request unsuccesssful, HTTP Status: " + response.status); }
  if (!response.data || !response.data.trips) { throw new Error("Trips missing in response"); }
  return response.data.trips;
}

/**
 * Gets you the troute details for a particular journey
 *
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @param {string} tripId the trip you are interested in
 * @param {string} estimateSpeed get estimated speeds for waypoints based on GPS with the response (default = false)
 * @returns {(Promise<ITrip[]>)} the list of trips known for the vehicle
 */
export async function getRoute(vin: string, deviceId: string, access_token: string, tripId: string, estimateSpeed: boolean = false): Promise<IWaypoint[]> {

  const posConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };

  let response: AxiosResponse;
  response = await axios.get(`${IF9_BASEURI}/jlr/vehicles/${vin}/trips/${tripId}/route`, posConfig);
  if (response.status !== 200) { throw new Error("Backend request unsuccesssful, HTTP Status: " + response.status); }
  if (!response.data || !response.data.waypoints) { throw new Error("Waypoints missing in response"); }
  return estimateSpeed ? addSpeedToWaypointList(response.data.waypoints) : response.data.waypoints;
}

/**
 * Gets you the attribute of a particular car by vin
 *
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {(Promise<IAttributes>)} the vehicles attributes
 */
export async function getAttributes(vin: string, deviceId: string, access_token: string): Promise<IAttributes> {

  const attrConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": deviceId,
      "Accept": "application/vnd.ngtp.org.VehicleAttributes-v3+json",
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
    },
  };

  let response: AxiosResponse;
  response = await axios.get(`${IF9_BASEURI}/jlr/vehicles/${vin}/attributes`, attrConfig);
  if (response.status !== 200) { throw new Error("Attributes missing in response"); }
  return response.data;
}

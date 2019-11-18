"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:object-literal-sort-keys variable-name max-union-size no-duplicate-string cognitive-complexity max-line-length
const axios_1 = __importDefault(require("axios"));
const rxjs_1 = require("rxjs");
const WebSocket = require("ws");
const Logger_1 = require("../Logger");
const utils_1 = require("../utils");
const constants_1 = require("./constants");
function authenticateRequest(deviceId, access_token, pin, vin, userId, serviceName) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventTokenConfig = {
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
        let eventTokenresponse;
        try {
            eventTokenresponse = yield axios_1.default.post(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/users/${userId}/authenticate`, eventTokenBody, eventTokenConfig);
        }
        catch (error) {
            Logger_1.Logger.error(error);
            throw new Error("Cannot obtain eventToken");
        }
        return eventTokenresponse.data.token;
    });
}
exports.authenticateRequest = authenticateRequest;
/**
 * Fetch the list of all vehicles assigned to the given user
 *
 * @export
 * @param {string} userId the users id
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {(Promise<IVehicle[]>)}
 */
function getVehicleList(userId, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "X-Device-Id": deviceId,
                "Authorization": "Bearer " + access_token,
                "X-Requestor": "jlr",
            },
        };
        let response;
        response = yield axios_1.default.get(`${constants_1.IF9_BASEURI}/jlr/users/${userId}/vehicles/`, config);
        return response.data.vehicles;
    });
}
exports.getVehicleList = getVehicleList;
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
function unlockVehicle(vin, userId, pin, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield authenticateRequest(deviceId, access_token, pin, vin, userId, "RDU");
        const unlockConfig = {
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
        let response;
        response = yield axios_1.default.post(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/unlock`, unlockBody, unlockConfig);
        return response.data;
    });
}
exports.unlockVehicle = unlockVehicle;
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
function lockVehicle(vin, userId, pin, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield authenticateRequest(deviceId, access_token, pin, vin, userId, "RDL");
        const lockConfig = {
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
        let response;
        response = yield axios_1.default.post(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/lock`, lockBody, lockConfig);
        return response.data;
    });
}
exports.lockVehicle = lockVehicle;
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
function startEngine(vin, userId, pin, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield authenticateRequest(deviceId, access_token, pin, vin, userId, "REON");
        const lockConfig = {
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
        let response;
        response = yield axios_1.default.post(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/engineOn`, lockBody, lockConfig);
        return response.data;
    });
}
exports.startEngine = startEngine;
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
function stopEngine(vin, userId, pin, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield authenticateRequest(deviceId, access_token, pin, vin, userId, "REOFF");
        const lockConfig = {
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
        let response;
        response = yield axios_1.default.post(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/engineOff`, lockBody, lockConfig);
        return response.data;
    });
}
exports.stopEngine = stopEngine;
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
function ServiceRequestRISM(vin, customerServiceId, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const RISMserviceConfig = {
            headers: {
                "Accept": "application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json",
                "X-Device-Id": deviceId,
                "Authorization": "Bearer " + access_token,
                "X-Requestor": "jlr",
            },
        };
        let response;
        response = yield axios_1.default.get(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/services/${customerServiceId}`, RISMserviceConfig);
        return response.data;
    });
}
exports.ServiceRequestRISM = ServiceRequestRISM;
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
function updateVehicleStausOnBackend(vin, userId, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield authenticateRequest(deviceId, access_token, undefined, vin, userId, "VHS");
        const statusUpdateConfig = {
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
        let response;
        response = yield axios_1.default.post(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/healthstatus`, statusUpdateBody, statusUpdateConfig);
        return response.data;
    });
}
exports.updateVehicleStausOnBackend = updateVehicleStausOnBackend;
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
function getStatus(vin, userId, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            headers: {
                "Authorization": "Bearer " + access_token,
                "Accept": "application/vnd.ngtp.org.if9.healthstatus-v3+json",
                "Content-Type": "application/json;charset=UTF-8",
                "X-Device-Id": deviceId,
                "X-Requestor": "jlr",
            },
        };
        let response;
        response = yield axios_1.default.get(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/status`, config);
        return parseStatus(response.data);
    });
}
exports.getStatus = getStatus;
function parseStatus(data) {
    const resp = {};
    resp.lastUpdatedTime = data.lastUpdatedTime;
    const vehicleState = data.vehicleStatus;
    const vehicleAlerts = data.vehicleAlerts;
    // cleanup the API repsonse
    // coreStatus
    resp.vehicleStatus = { coreStatus: {}, evStatus: {} };
    if (vehicleState) {
        if (vehicleState.coreStatus) {
            for (const element of vehicleState.coreStatus) {
                resp.vehicleStatus.coreStatus[utils_1.convertoCamelCase(element.key)] = element.value;
            }
        }
        if (vehicleState.evStatus) {
            for (const element of vehicleState.evStatus) {
                resp.vehicleStatus.evStatus[utils_1.convertoCamelCase(element.key)] = element.value;
            }
        }
    }
    if (vehicleAlerts) {
        resp.vehicleAlerts = {};
        for (const element of vehicleAlerts) {
            resp.vehicleAlerts[utils_1.convertoCamelCase(element.key)] = {
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
function beepAndFlash(vin, userId, pin, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield authenticateRequest(deviceId, access_token, pin, vin, userId, "HBLF");
        const lockConfig = {
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
        let response;
        response = yield axios_1.default.post(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/HBLF`, lockBody, lockConfig);
        return response.data;
    });
}
exports.beepAndFlash = beepAndFlash;
/**
 * Gets you the last known location of a vehicle
 *
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {(Promise<IGeoLocation>)} the location of the vehicle
 */
function getLocation(vin, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const posConfig = {
            headers: {
                "Content-Type": "application/json",
                "X-Device-Id": deviceId,
                "Authorization": "Bearer " + access_token,
                "X-Requestor": "jlr",
            },
        };
        let response;
        response = yield axios_1.default.get(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/position`, posConfig);
        return response.data;
    });
}
exports.getLocation = getLocation;
/**
 * fetch the current WebSocket Url from the backend
 *
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {Promise<string>} the websocket url
 */
function getWebSocketUrl(userName, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const getConfig = {
            headers: {
                "Content-Type": "application/json",
                "X-Device-Id": deviceId,
                "Authorization": "Bearer " + access_token,
                "X-Requestor": "jlr",
                "Accept": "text/plain",
                "x-telematicsprogramtype": "landroverprogram",
            },
        };
        const response = yield axios_1.default.get(`${constants_1.IF9_BASEURI}/jlr/vehicles/${userName}/${deviceId}/getWebsocketURL/2`, getConfig);
        return response.data + "?" + deviceId;
    });
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
function vehicleStatus(userName, deviceId, access_token, vins) {
    const observable = new rxjs_1.Subject();
    getWebSocketUrl(userName, deviceId, access_token).then((brokerURL) => {
        const socket = new WebSocket(brokerURL);
        socket.onopen = (evt) => {
            socket.onclose = (closeEvt) => {
                Logger_1.Logger.info("WebSocket was closed with code", closeEvt.code);
            };
            socket.onmessage = (msg) => {
                const stomp = utils_1.StompFrame.fromFrame(msg.data.toString());
                if (msg.data === "\n") {
                    // this was just a heart beat
                    Logger_1.Logger.info("<<< PONG");
                    socket.send("\n");
                }
                else {
                    switch (stomp.command) {
                        case "MESSAGE":
                            const id = stomp.headers["message-id"];
                            const ackFrame = utils_1.StompFrame.toFrame({
                                command: "SEND",
                                headers: {
                                    destination: "/app/messageReceived",
                                },
                                body: JSON.stringify({ deviceId, messageIds: [id] }),
                            });
                            socket.send(ackFrame);
                            if (stomp.body) {
                                observable.next(parseStatusBody(JSON.parse(stomp.body)));
                            }
                            break;
                        case "CONNECTED":
                            Logger_1.Logger.info("Connected to STOMP");
                            break;
                        default:
                            Logger_1.Logger.debug(`Unknown message type received ${stomp.command}`);
                    }
                }
            };
            socket.onerror = (err) => {
                Logger_1.Logger.error(err.message);
                throw err;
            };
            // first connect on STOMP level.. whyever STOMP was introduced.. hmm.
            const frame = utils_1.StompFrame.toFrame({
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
            const subFrame = utils_1.StompFrame.toFrame({
                command: "SUBSCRIBE",
                headers: {
                    destination: "/user/topic/DEVICE." + deviceId,
                    id: "deviceSubScription",
                    deviceId,
                },
            });
            Logger_1.Logger.debug("device subscribe..");
            socket.send(subFrame);
            // now do the handshake
            const handshakeFrame = utils_1.StompFrame.toFrame({
                command: "SEND",
                headers: {
                    destination: "/app/handshake",
                }, body: JSON.stringify({
                    deviceId,
                    protocolVersion: 1,
                }),
            });
            Logger_1.Logger.debug("handshaking..");
            socket.send(handshakeFrame);
            // subscribe to all VIN channels to receive further vehicle related messages
            for (const vin of vins) {
                const vinSubscriptionFrame = utils_1.StompFrame.toFrame({
                    command: "SUBSCRIBE",
                    headers: {
                        destination: "/user/topic/VIN." + vin,
                        id: "vinSubscription",
                        deviceId,
                    },
                });
                Logger_1.Logger.debug("VIN subscribe..");
                socket.send(vinSubscriptionFrame);
            }
        };
    });
    return observable;
}
exports.vehicleStatus = vehicleStatus;
function parseStatusBody(body) {
    const resp = [];
    if (Array.isArray(body) && body[0].eid.match(/\w*_\@NGTP/) !== null) {
        for (const element of body) {
            let $obj = {};
            if (null !== element.st.match(/^VHS|REON|REOFF|HBLF|RDL|RDU$/)) {
                $obj.statusType = element.st;
                $obj.timestamp = element.t;
                $obj.vin = element.v;
                $obj.data = parseStatus(JSON.parse(element.a.b));
            }
            else {
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
function registerNotificationTargets(vin, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const regConfig = {
            headers: {
                "Content-Type": "application/vnd.wirelesscar.ngtp.if9.NotificationTargets-v2+json",
                "Accept": "application/json",
                "X-Device-Id": deviceId,
                "Authorization": "Bearer " + access_token,
                "X-Requestor": "jlr",
            },
        };
        const regBody = {
            expireAt: (new Date(Date.now() + 864000000)).toISOString(),
            name: "super-heroic-wc-if9-nodeJS-module",
            // tslint:disable-next-line:max-line-length
            services: ["VHS", "SVT", "TN", "UPS", "VHC", "ALOFF", "BCALL", "CI", "ECALL", "HBLF", "JL", "RDL", "RDU", "REOFF", "REON"],
            state: "CONFIRMED",
            uri: `pn:ws:${deviceId}:ce76a9f77ea94536a2652ff344cec7f0ac833c24`,
            websocketProtocolVersion: 2,
        };
        let response;
        response = yield axios_1.default.post(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/config/notificationTargets`, regBody, regConfig);
        // tslint:disable-next-line:max-line-length
        if (response.status !== 204) {
            throw new Error("Could not register NotificationTragets, got status " + response.status);
        }
    });
}
exports.registerNotificationTargets = registerNotificationTargets;
/**
 * Gets you the the vehicles journeys
 *
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {(Promise<ITrip[]>)} the list of trips known for the vehicle
 */
function getTrips(vin, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const posConfig = {
            headers: {
                "Content-Type": "application/json",
                "X-Device-Id": deviceId,
                "Authorization": "Bearer " + access_token,
                "X-Requestor": "jlr",
            },
        };
        let response;
        response = yield axios_1.default.get(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/trips`, posConfig);
        if (response.status !== 200) {
            throw new Error("Backend request unsuccesssful, HTTP Status: " + response.status);
        }
        if (!response.data || !response.data.trips) {
            throw new Error("Trips missing in response");
        }
        return response.data.trips;
    });
}
exports.getTrips = getTrips;
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
function getRoute(vin, deviceId, access_token, tripId, estimateSpeed = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const posConfig = {
            headers: {
                "Content-Type": "application/json",
                "X-Device-Id": deviceId,
                "Authorization": "Bearer " + access_token,
                "X-Requestor": "jlr",
            },
        };
        let response;
        response = yield axios_1.default.get(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/trips/${tripId}/route`, posConfig);
        if (response.status !== 200) {
            throw new Error("Backend request unsuccesssful, HTTP Status: " + response.status);
        }
        if (!response.data || !response.data.waypoints) {
            throw new Error("Waypoints missing in response");
        }
        return estimateSpeed ? utils_1.addSpeedToWaypointList(response.data.waypoints) : response.data.waypoints;
    });
}
exports.getRoute = getRoute;
/**
 * Gets you the attribute of a particular car by vin
 *
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {(Promise<IAttributes>)} the vehicles attributes
 */
function getAttributes(vin, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const attrConfig = {
            headers: {
                "Content-Type": "application/json",
                "X-Device-Id": deviceId,
                "Accept": "application/vnd.ngtp.org.VehicleAttributes-v3+json",
                "Authorization": "Bearer " + access_token,
                "X-Requestor": "jlr",
            },
        };
        let response;
        response = yield axios_1.default.get(`${constants_1.IF9_BASEURI}/jlr/vehicles/${vin}/attributes`, attrConfig);
        if (response.status !== 200) {
            throw new Error("Attributes missing in response");
        }
        return response.data;
    });
}
exports.getAttributes = getAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVoaWNsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvdmVoaWNsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGdJQUFnSTtBQUNoSSxrREFBaUU7QUFDakUsK0JBQStCO0FBQy9CLGdDQUFpQztBQUNqQyxzQ0FBbUM7QUFFbkMsb0NBQWlGO0FBQ2pGLDJDQUEwQztBQUUxQyw2QkFBMEMsUUFBZ0IsRUFBRSxZQUFvQixFQUFFLEdBQVcsRUFBRSxHQUFXLEVBQ2hFLE1BQWMsRUFBRSxXQUFvRDs7UUFDNUcsTUFBTSxnQkFBZ0IsR0FBdUI7WUFDM0MsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrRUFBa0U7Z0JBQ2xGLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGFBQWEsRUFBRSxRQUFRO2dCQUN2QixlQUFlLEVBQUUsU0FBUyxHQUFHLFlBQVk7Z0JBQ3pDLGFBQWEsRUFBRSxLQUFLO2FBQ3JCO1NBQ0YsQ0FBQztRQUNGLE1BQU0sY0FBYyxHQUFHO1lBQ3JCLEdBQUc7WUFDSCxXQUFXO1NBQ1osQ0FBQztRQUNGLElBQUksa0JBQWlDLENBQUM7UUFDdEMsSUFBSTtZQUNGLGtCQUFrQixHQUFHLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLHVCQUFXLGlCQUFpQixHQUFHLFVBQVUsTUFBTSxlQUFlLEVBQ3ZHLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ25DO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxlQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztTQUM3QztRQUNELE9BQU8sa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN2QyxDQUFDO0NBQUE7QUF4QkQsa0RBd0JDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCx3QkFBcUMsTUFBYyxFQUFFLFFBQWdC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
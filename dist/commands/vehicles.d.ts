import { Subject } from "rxjs";
import { IAttributes, IEventStatus, IGeoLocation, ITrip, IVehicle, IVehicleStatus, IWaypoint } from "../types";
export declare function authenticateRequest(deviceId: string, access_token: string, pin: string, vin: string, userId: string, serviceName: "RDU" | "RDL" | "VHS" | "REON" | "REOFF" | "HBLF"): Promise<any>;
/**
 * Fetch the list of all vehicles assigned to the given user
 *
 * @export
 * @param {string} userId the users id
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {(Promise<IVehicle[]>)}
 */
export declare function getVehicleList(userId: string, deviceId: string, access_token: string): Promise<IVehicle[]>;
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
export declare function unlockVehicle(vin: string, userId: string, pin: string, deviceId: string, access_token: string): Promise<IEventStatus>;
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
export declare function lockVehicle(vin: string, userId: string, pin: string, deviceId: string, access_token: string): Promise<IEventStatus>;
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
export declare function startEngine(vin: string, userId: string, pin: string, deviceId: string, access_token: string): Promise<IEventStatus>;
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
export declare function stopEngine(vin: string, userId: string, pin: string, deviceId: string, access_token: string): Promise<IEventStatus>;
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
export declare function ServiceRequestRISM(vin: string, customerServiceId: string, deviceId: string, access_token: string): Promise<IEventStatus>;
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
export declare function updateVehicleStausOnBackend(vin: string, userId: string, deviceId: string, access_token: string): Promise<IEventStatus>;
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
export declare function getStatus(vin: string, userId: string, deviceId: string, access_token: string): Promise<IVehicleStatus>;
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
export declare function beepAndFlash(vin: string, userId: string, pin: string, deviceId: string, access_token: string): Promise<IEventStatus>;
/**
 * Gets you the last known location of a vehicle
 *
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {(Promise<IGeoLocation>)} the location of the vehicle
 */
export declare function getLocation(vin: string, deviceId: string, access_token: string): Promise<IGeoLocation>;
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
export declare function vehicleStatus(userName: string, deviceId: string, access_token: string, vins: string[]): Subject<{}>;
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
export declare function registerNotificationTargets(vin: string, deviceId: string, access_token: string): Promise<void>;
/**
 * Gets you the the vehicles journeys
 *
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {(Promise<ITrip[]>)} the list of trips known for the vehicle
 */
export declare function getTrips(vin: string, deviceId: string, access_token: string): Promise<ITrip[]>;
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
export declare function getRoute(vin: string, deviceId: string, access_token: string, tripId: string, estimateSpeed?: boolean): Promise<IWaypoint[]>;
/**
 * Gets you the attribute of a particular car by vin
 *
 * @param {string} vin the vehicles indentifiaction number
 * @param {string} deviceId the device id registered with the API for accessing IF9
 * @param {string} access_token a valid access token for the user
 * @returns {(Promise<IAttributes>)} the vehicles attributes
 */
export declare function getAttributes(vin: string, deviceId: string, access_token: string): Promise<IAttributes>;

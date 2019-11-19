import { request } from "https";
import vehicles from "../config/vehicles.json";
import { Logger } from "../utils/logger";
import { getRandomInt } from "../utils/math";

const requests = {

};

export function dispatch2Vehicle(type, VIN) {
  switch (type) {
    case "RDL":
      return setState(VIN, {lockState: "locked"}, type);
      break;
    case "RDU":
      return setState(VIN, {lockState: "unlocked"}, type);
      break;
    case "HBLF":
      return setState(VIN, {blinking: true}, type);
      break;
    default:
      break;
  }
}

function setState(vehicleId, stateDiff, serviceType) {
  const delay = getRandomInt(1000, 60000); // between 0 and 180000
  const customerServiceId = `${getRandomInt(3497978842)}_${getRandomInt(1574021522259)}_${getRandomInt(99, 1)}@NGTP`;
  Logger.info(`Setting vehicle state for "${vehicleId}" state in ${delay} milliseconds with customerServiceId ${customerServiceId}`);
  // create a new request
  const time = (new Date()).toISOString();
  setTimeout(() => {
    vehicles[vehicleId] = vehicles[vehicleId] ? Object.assign(vehicles[vehicleId], stateDiff) : stateDiff;
    Logger.info(`Set vehicle state for "${vehicleId}" state to:`);
    Logger.info(vehicles[vehicleId]);
    requests[customerServiceId] = {
      status: "Completed",
      statusTimestamp: (new Date()).toISOString(),
      startTime: time,
      serviceType,
      failureDescription: "",
      customerServiceId,
      vehicleId,
      active: false,
      initiator: "USER",
      eventTrigger: null,
      serviceCommand: null,
      serviceParameters: null };
  }, delay);
  return requests[customerServiceId] = {
    status: "Started",
    statusTimestamp: time,
    startTime: time,
    serviceType,
    failureDescription: "",
    customerServiceId,
    vehicleId,
    active: true,
    initiator: "USER",
    eventTrigger: null,
    serviceCommand: null,
    serviceParameters: null };
}

import { IWaypoint } from "../types";
import { addSpeedToWaypointList } from "./waypoints";

it("should return empty list on empty input", () => {
  expect(addSpeedToWaypointList([]).length).toBe(0);
});

it("should return the correct speed profile", () => {
  const mockWaypoints: IWaypoint[] = [
    {
      electricalConsumption: null,
      electricalRegeneration: null,
      fuelConsumption: null,
      odometer: 6069000,
      position: {
        heading: 76,
        latitude: 52.18924778,
        longitude: -1.47891306,
      },
      timestamp: new Date("2019-02-20T12:53:39+0000"),
    },
    {
      electricalConsumption: null,
      electricalRegeneration: null,
      fuelConsumption: null,
      odometer: 6069000,
      position: {
        heading: 172,
        latitude: 52.18924222,
        longitude: -1.47891861,
      },
      timestamp: new Date("2019-02-20T12:53:49+0000"),
    },
    {
      electricalConsumption: null,
      electricalRegeneration: null,
      fuelConsumption: null,
      odometer: 6069000,
      position: {
        heading: 172,
        latitude: 52.18907972,
        longitude: -1.4788625,
      },
      timestamp: new Date("2019-02-20T12:53:54+0000"),
    }];
  expect(addSpeedToWaypointList(mockWaypoints).length).toBe(3);
  expect(addSpeedToWaypointList(mockWaypoints)[0].position).toBeDefined();
  expect(addSpeedToWaypointList(mockWaypoints)[0].position.speed).toBeDefined();
  expect(addSpeedToWaypointList(mockWaypoints)[0].position.speed).toBe(0);
  expect(addSpeedToWaypointList(mockWaypoints)[1].position).toBeDefined();
  expect(addSpeedToWaypointList(mockWaypoints)[1].position.speed).toBeDefined();
  expect(addSpeedToWaypointList(mockWaypoints)[1].position.speed).toBe(0.07229709046146124);
  expect(addSpeedToWaypointList(mockWaypoints)[2].position).toBeDefined();
  expect(addSpeedToWaypointList(mockWaypoints)[2].position.speed).toBeDefined();
  expect(addSpeedToWaypointList(mockWaypoints)[2].position.speed).toBe(3.6937204468907554);
});

it("should return 0 speed for two identical waypoints", () => {
  const mockWaypoints: IWaypoint[] = [
    {
      electricalConsumption: null,
      electricalRegeneration: null,
      fuelConsumption: null,
      odometer: 6069000,
      position: {
        heading: 76,
        latitude: 52.18924778,
        longitude: -1.47891306,
      },
      timestamp: new Date("2019-02-20T12:53:39+0000"),
    },
    {
      electricalConsumption: null,
      electricalRegeneration: null,
      fuelConsumption: null,
      odometer: 6069000,
      position: {
        heading: 76,
        latitude: 52.18924778,
        longitude: -1.47891306,
      },
      timestamp: new Date("2019-02-20T12:53:49+0000"),
    }];
  expect(addSpeedToWaypointList(mockWaypoints).length).toBe(2);
  expect(addSpeedToWaypointList(mockWaypoints)[0].position).toBeDefined();
  expect(addSpeedToWaypointList(mockWaypoints)[0].position.speed).toBeDefined();
  expect(addSpeedToWaypointList(mockWaypoints)[0].position.speed).toBe(0);
  expect(addSpeedToWaypointList(mockWaypoints)[1].position).toBeDefined();
  expect(addSpeedToWaypointList(mockWaypoints)[1].position.speed).toBeDefined();
  expect(addSpeedToWaypointList(mockWaypoints)[1].position.speed).toBe(0);
});

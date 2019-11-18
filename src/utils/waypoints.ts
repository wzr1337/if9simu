import { IWaypoint } from "../types";

export function addSpeedToWaypointList(waypoints: IWaypoint[]): IWaypoint[] {
  const result = [];
  let lastWaypoint: IWaypoint;

  for (const waypoint of waypoints) {
    if (!lastWaypoint) {
      waypoint.position.speed = 0;
      result.push(waypoint);
      lastWaypoint = waypoint;
    } else {
      const distanceM = distance(lastWaypoint.position.latitude, lastWaypoint.position.longitude,
                          waypoint.position.latitude, waypoint.position.longitude) * 1000;
      const date1 = new Date(lastWaypoint.timestamp);
      const date2 = new Date(waypoint.timestamp);
      const timeDiffS = Math.abs(date2.getTime() - date1.getTime()) / 1000;
      waypoint.position.speed = (timeDiffS > 0 ) ? distanceM / timeDiffS : 0;
      result.push(waypoint);
      lastWaypoint = waypoint;
    }
  }
  return result;
}

function distance(lat1, lon1, lat2, lon2) {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  } else {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(Math.min(dist, 1)); // make sure we do not exceed 1
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344;
    return dist;
  }
}

// tslint:disable:object-literal-sort-keys variable-name max-union-size no-duplicate-string cognitive-complexity max-line-length
import mockAxios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { DEVICEID, MOCKUSER, TOKENS } from "../constants.mock";
import { IGeoLocation, IVehicleStatus } from "../types/index";
import { IF9_BASEURI } from "./constants";
import { authenticateRequest, beepAndFlash, getAttributes, getLocation, getRoute, getStatus, getTrips, getVehicleList, lockVehicle, registerNotificationTargets, unlockVehicle } from "./vehicles";

it("should fetch a list of vehicles", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string) => {
    return { data: {
      vehicles: [
        {
          userId: MOCKUSER.id,
          vin: MOCKUSER.vin,
          role: "Primary",
        },
      ],
  } } as AxiosResponse;
  });

  const resp = await getVehicleList(MOCKUSER.id, DEVICEID, TOKENS.access_token);

  expect((resp).length).toBeGreaterThan(0);
  for (const idx in resp) {
    if (resp.hasOwnProperty(idx)) {
      const vehicle = resp [idx];
      expect(vehicle.vin).toEqual(MOCKUSER.vin);
      expect(vehicle.userId).toEqual(MOCKUSER.id);
      expect(vehicle.role).toEqual("Primary");
    }
  }

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": DEVICEID,
      "Authorization": "Bearer " + TOKENS.access_token,
      "X-Requestor": "jlr",
    },
  };

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/users/${MOCKUSER.id}/vehicles/`, config);
});

it("should fail fetching a list of vehicles", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    throw new Error("mockConnection broken");
  });

  try {
    const resp = await getVehicleList(MOCKUSER.id, DEVICEID, TOKENS.access_token);
  } catch (error) {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": DEVICEID,
        "Authorization": "Bearer " + TOKENS.access_token,
        "X-Requestor": "jlr",
      },
    };

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/users/${MOCKUSER.id}/vehicles/`, config);
  }
});

it("should fetch the vehicles location", async () => {
  const MOCKDATA = {
    position: {
        longitude: 11.939894,
        latitude: 57.707035,
        timestamp: 1515590775614,
        speed: 0,
        heading: 0,
        positionQuality: null,
    },
    calculatedPosition: {
        longitude: 11.939894,
        latitude: 57.707035,
        timestamp: 1515590775614,
        speed: 0,
        heading: 0,
        positionQuality: null,
    },
  };

  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string) => {
    return { data: MOCKDATA,
    } as AxiosResponse;
  });

  const resp: IGeoLocation = await getLocation(MOCKUSER.vin, DEVICEID, TOKENS.access_token);

  expect(resp.position).toBeDefined();
  expect(resp.position.longitude).toBeDefined();
  expect(resp.position.longitude).toEqual(MOCKDATA.position.longitude);
  expect(resp.position.latitude).toBeDefined();
  expect(resp.position.latitude).toEqual(MOCKDATA.position.latitude);
  expect(resp.position.timestamp).toBeDefined();
  expect(resp.position.speed).toBeDefined();
  expect(resp.position.speed).toEqual(MOCKDATA.position.speed);
  expect(resp.position.heading).toBeDefined();
  expect(resp.position.heading).toEqual(MOCKDATA.position.heading);

  expect(resp.calculatedPosition).toBeDefined();
  expect(resp.calculatedPosition.longitude).toBeDefined();
  expect(resp.calculatedPosition.longitude).toEqual(MOCKDATA.calculatedPosition.longitude);
  expect(resp.calculatedPosition.latitude).toBeDefined();
  expect(resp.calculatedPosition.latitude).toEqual(MOCKDATA.calculatedPosition.latitude);
  expect(resp.calculatedPosition.timestamp).toBeDefined();
  expect(resp.calculatedPosition.speed).toBeDefined();
  expect(resp.calculatedPosition.speed).toEqual(MOCKDATA.calculatedPosition.speed);
  expect(resp.calculatedPosition.heading).toBeDefined();
  expect(resp.calculatedPosition.heading).toEqual(MOCKDATA.calculatedPosition.heading);

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": DEVICEID,
      "Authorization": "Bearer " + TOKENS.access_token,
      "X-Requestor": "jlr",
    },
  };

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/vehicles/${MOCKUSER.vin}/position`, config);
});

it("should gracefully fail fetching the vehicles location", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    throw new Error("mockConnection broken");
  });

  try {
    const resp = await getLocation(MOCKUSER.vin, DEVICEID, TOKENS.access_token);
  } catch (error) {
    expect(error.message).toEqual("mockConnection broken");

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": DEVICEID,
        "Authorization": "Bearer " + TOKENS.access_token,
        "X-Requestor": "jlr",
      },
    };

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/vehicles/${MOCKUSER.vin}/position`, config);
  }
});

const VEHICLE_STATUS_MOCK = {
  vehicleStatus: {
      evStatus: [
          {
              key: "EV_CHARGING_STATUS",
              value: "CHARGING",
          },
          {
              key: "EV_CHARGING_METHOD",
              value: "WIRED",
          },
      ],
      coreStatus: [
          {
              key: "PRIVACY_SWITCH",
              value: "FALSE",
          },
          {
              key: "SERVICE_MODE",
              value: "FALSE",
          },
      ],
  },
  vehicleAlerts: [
      {
          key: "VEHICLE_ALARM",
          value: "false",
          active: false,
          lastUpdatedTime: "2017-11-03T09:04:20+0000",
      },
  ],
  lastUpdatedTime: "2017-11-22T07:54:03+0000",
};
it("should fetch the vehicle status", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string) => {
    return { data: VEHICLE_STATUS_MOCK } as AxiosResponse;
  });

  const resp: IVehicleStatus = await getStatus(MOCKUSER.vin, MOCKUSER.id, DEVICEID, TOKENS.access_token);

  expect(resp.lastUpdatedTime).toBeDefined();
  expect(typeof resp.lastUpdatedTime).toBe("string");
  expect(resp.lastUpdatedTime).toBe(VEHICLE_STATUS_MOCK.lastUpdatedTime);

  expect(resp.vehicleStatus).toBeDefined();
  expect(resp.vehicleStatus.coreStatus).toBeDefined();
  expect(resp.vehicleStatus.coreStatus.privacySwitch).toBe("FALSE");
  expect(resp.vehicleStatus.coreStatus.serviceMode).toBe("FALSE");
  expect(resp.vehicleStatus.evStatus).toBeDefined();
  expect(resp.vehicleStatus.evStatus.evChargingStatus).toBe("CHARGING");
  expect(resp.vehicleStatus.evStatus.evChargingMethod).toBe("WIRED");

  expect(resp.vehicleAlerts).toBeDefined();
  expect(resp.vehicleAlerts.vehicleAlarm).toBeDefined();
  expect(resp.vehicleAlerts.vehicleAlarm.isActive).toBeFalsy();
  expect(resp.vehicleAlerts.vehicleAlarm.value).toBe("false");
  expect(resp.vehicleAlerts.vehicleAlarm.lastUpdatedTime).toBe("2017-11-03T09:04:20+0000");

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "X-Device-Id": DEVICEID,
      "Accept": "application/vnd.ngtp.org.if9.healthstatus-v3+json",
      "Authorization": "Bearer " + TOKENS.access_token,
      "X-Requestor": "jlr",
    },
  };

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/vehicles/${MOCKUSER.vin}/status`, config);
});

it("should fetch the vehicle status even with missing evStatus", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string) => {
    const failing = Object.assign({}, VEHICLE_STATUS_MOCK);
    delete failing.vehicleStatus.evStatus;
    return { data: failing } as AxiosResponse;
  });

  const resp: IVehicleStatus = await getStatus(MOCKUSER.vin, MOCKUSER.id, DEVICEID, TOKENS.access_token);

  expect(resp.lastUpdatedTime).toBeDefined();
  expect(typeof resp.lastUpdatedTime).toBe("string");
  expect(resp.lastUpdatedTime).toBe(VEHICLE_STATUS_MOCK.lastUpdatedTime);

  expect(resp.vehicleStatus).toBeDefined();
  expect(resp.vehicleStatus.coreStatus).toBeDefined();
  expect(resp.vehicleStatus.coreStatus.privacySwitch).toBe("FALSE");
  expect(resp.vehicleStatus.coreStatus.serviceMode).toBe("FALSE");

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "X-Device-Id": DEVICEID,
      "Accept": "application/vnd.ngtp.org.if9.healthstatus-v3+json",
      "Authorization": "Bearer " + TOKENS.access_token,
      "X-Requestor": "jlr",
    },
  };

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/vehicles/${MOCKUSER.vin}/status`, config);
});

it("should throw an exception when authenticateRequest fails", async () => {
  (mockAxios.post as jest.Mock).mockImplementationOnce(async (uri: string) => {
    return { status: 500 } as AxiosResponse;
  });

  let failed = false;
  try {
    await authenticateRequest(DEVICEID, TOKENS.access_token, MOCKUSER.pin, MOCKUSER.vin, MOCKUSER.id, "HBLF");
  } catch (error) {
    failed = true;
  }

  expect(failed).toBe(true);
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.AuthenticateRequest-v2+json",
      "Accept": "application/json",
      "X-Device-Id":  DEVICEID,
      "Authorization": "Bearer " + TOKENS.access_token,
      "X-Requestor": "jlr",
    },
  };

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/vehicles/${MOCKUSER.vin}/users/${MOCKUSER.id}/authenticate`, { pin: MOCKUSER.pin, serviceName: "HBLF"}, config);

});

it("should execute HBLF on the vehicle", async () => {
  (mockAxios.post as jest.Mock).mockImplementationOnce(async (uri: string) => {
    return { data: VEHICLE_STATUS_MOCK } as AxiosResponse;
  });

  await beepAndFlash(MOCKUSER.vin, MOCKUSER.id, MOCKUSER.pin, DEVICEID, TOKENS.access_token);

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.AuthenticateRequest-v2+json",
      "Accept": "application/json",
      "X-Device-Id":  DEVICEID,
      "Authorization": "Bearer " + TOKENS.access_token,
      "X-Requestor": "jlr",
    },
  };

  expect(mockAxios.post).toHaveBeenCalledTimes(2);
  expect(mockAxios.post).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/vehicles/${MOCKUSER.vin}/users/${MOCKUSER.id}/authenticate`, { pin: MOCKUSER.pin, serviceName: "HBLF"}, config);

  const config_: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json",
      "Accept": "application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json",
      "X-Device-Id":  DEVICEID,
      "Authorization": "Bearer " + TOKENS.access_token,
      "X-Requestor": "jlr",
    },
  };
  expect(mockAxios.post).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/vehicles/${MOCKUSER.vin}/HBLF`, { }, config_);
});

it("should register for notificationm targets corrently", async () => {
  (mockAxios.post as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    return { status: 204 } as AxiosResponse;
  });

  await registerNotificationTargets(MOCKUSER.vin, DEVICEID, TOKENS.access_token);
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  // can not check exact values being called because a timestamp is added internaly

});

it("should throw an error when registering for notificationm targets fails", async () => {
  (mockAxios.post as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    return { status: 500 } as AxiosResponse;
  });

  let failed = false;
  try {
    await registerNotificationTargets(MOCKUSER.vin, DEVICEID, TOKENS.access_token);
  } catch (error) {
    failed = true;
  }
  expect(failed).toBeTruthy();
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  // can not check exact values being called because a timestamp is added internaly

});

it("should fetch atrributes", async () => {

  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    return { status: 200, data: {
      engineCode: "2.0",
      seatsQuantity: 5,
      exteriorColorName: "Black",
      exteriorCode: "Black",
      interiorColorName: null,
      interiorCode: null,
      tyreDimensionCode: null,
      tyreInflationPressureLightCode: null,
      tyreInflationPressureHeavyCode: null,
      fuelType: "Diesel",
      nickname: "foo",
    } } as AxiosResponse;
  });

  const resp = await getAttributes(MOCKUSER.vin, DEVICEID, TOKENS.access_token);

  expect(resp).toBeDefined();
  expect(resp.engineCode).toBe("2.0");
  expect(resp.nickname).toBe("foo");

  expect(mockAxios.get).toHaveBeenCalledTimes(1);

});

it("should execute unlock on the vehicle", async () => {
  (mockAxios.post as jest.Mock).mockImplementationOnce(async (uri: string) => {
    return { status: 200, data: VEHICLE_STATUS_MOCK } as AxiosResponse;
  });

  await unlockVehicle(MOCKUSER.vin, MOCKUSER.id, MOCKUSER.pin, DEVICEID, TOKENS.access_token);

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.AuthenticateRequest-v2+json",
      "Accept": "application/json",
      "X-Device-Id":  DEVICEID,
      "Authorization": "Bearer " + TOKENS.access_token,
      "X-Requestor": "jlr",
    },
  };

  expect(mockAxios.post).toHaveBeenCalledTimes(2);
  expect(mockAxios.post).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/vehicles/${MOCKUSER.vin}/users/${MOCKUSER.id}/authenticate`, { pin: MOCKUSER.pin, serviceName: "RDU"}, config);

  const config_: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json",
      "Accept": "application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json",
      "X-Device-Id":  DEVICEID,
      "Authorization": "Bearer " + TOKENS.access_token,
      "X-Requestor": "jlr",
    },
  };
  expect(mockAxios.post).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/vehicles/${MOCKUSER.vin}/unlock`, { }, config_);
});

it("should execute lock on the vehicle", async () => {
  (mockAxios.post as jest.Mock).mockImplementationOnce(async (uri: string) => {
    return { status: 200, data: VEHICLE_STATUS_MOCK } as AxiosResponse;
  });

  await lockVehicle(MOCKUSER.vin, MOCKUSER.id, MOCKUSER.pin, DEVICEID, TOKENS.access_token);

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.AuthenticateRequest-v2+json",
      "Accept": "application/json",
      "X-Device-Id":  DEVICEID,
      "Authorization": "Bearer " + TOKENS.access_token,
      "X-Requestor": "jlr",
    },
  };

  expect(mockAxios.post).toHaveBeenCalledTimes(2);
  expect(mockAxios.post).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/vehicles/${MOCKUSER.vin}/users/${MOCKUSER.id}/authenticate`, { pin: MOCKUSER.pin, serviceName: "RDL"}, config);

  const config_: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/vnd.wirelesscar.ngtp.if9.StartServiceConfiguration-v3+json",
      "Accept": "application/vnd.wirelesscar.ngtp.if9.ServiceStatus-v4+json",
      "X-Device-Id":  DEVICEID,
      "Authorization": "Bearer " + TOKENS.access_token,
      "X-Requestor": "jlr",
    },
  };
  expect(mockAxios.post).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/vehicles/${MOCKUSER.vin}/lock`, { }, config_);
});

it("should fail fetching attributes on status codes other than 200", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    return { status: 500 } as AxiosResponse;
  });

  let failed = false;
  try {
    await getAttributes(MOCKUSER.vin, DEVICEID, TOKENS.access_token);
  } catch (error) {
    failed = true;
  }
  expect(failed).toBeTruthy();
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});

it("should fail getTrips() on HTTP response other than 200", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    return { status: 500 } as AxiosResponse;
  });
  let failed = false;
  try {
    await getTrips(MOCKUSER.vin, DEVICEID, TOKENS.access_token);
  } catch (error) {
    failed = true;
  }
  expect(failed).toBeTruthy();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);

});

it("should return a list of trips", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    return {
      status: 200,
      data: {
        trips: [
            {
                id: 1,
                name: "Race!",
                category: null,
                routeDetails: {
                    totalWaypoints: 5,
                    boundingBox: {
                        minLongitude: 11.957915400000047,
                        minLatitude: 57.7111051,
                        maxLongitude: 11.964011300000038,
                        maxLatitude: 57.7163973,
                    },
                },
                tripDetails: {
                    electricalConsumption: null,
                    electricalRegeneration: null,
                    fuelConsumption: 5.25,
                    distance: 1534,
                    startOdometer: 30000,
                    startTime: "2014-10-20T23:42:22+0000",
                    startPosition: {
                        latitude: 57.7111051,
                        longitude: 11.957915400000047,
                        address: "Lundbyvassen, Gothenburg, Sweden",
                        postalCode: "41755",
                        city: "Gothenburg",
                        region: "Västra Götaland",
                        country: "Sverige",
                    },
                    endOdometer: 31534,
                    endTime: "2014-10-20T23:45:31+0000",
                    endPosition: {
                        latitude: 57.7111051,
                        longitude: 11.957915400000047,
                        address: "Lundbyvassen, Gothenburg, Sweden",
                        postalCode: "41755",
                        city: "Gothenburg",
                        region: "Västra Götaland",
                        country: "Sverige",
                    },
                    throttleEcoScore: {
                        score: 1.6,
                        scoreStatus: "VALID",
                    },
                    speedEcoScore: {
                        score: 0.9,
                        scoreStatus: "VALID",
                    },
                    brakeEcoScore: {
                        score: 0.1,
                        scoreStatus: "VALID",
                    },
                    averageSpeed: 270,
                    averageFuelConsumption: 25.5,
                    averageEnergyConsumption: 4,
                    energyRegenerated: 2,
                    averagePHEVFuelConsumption: 3,
                    evDistance: 300,
                },
            },
        ],
    },

    } as AxiosResponse;
  });
  const trips = await getTrips(MOCKUSER.vin, DEVICEID, TOKENS.access_token);
  expect(trips).toBeDefined();
  expect(Array.isArray(trips)).toBeTruthy();
  expect(trips.length).toEqual(1);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  // can not check exact values being called because a timestamp is added internaly

});

// tslint:disable-next-line:no-identical-functions
it("should fail getTrips() on HTTP response 200 with no data", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    return { status: 200 } as AxiosResponse;
  });

  let failed = false;
  try {
    await getTrips(MOCKUSER.vin, DEVICEID, TOKENS.access_token);
  } catch (error) {
    failed = true;
  }
  expect(failed).toBeTruthy();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);

});

// tslint:disable-next-line:no-identical-functions
it("should getRoute() on HTTP response 200 with data", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    return {
      status: 200,
      data: {
        waypoints: [],
      },
    } as AxiosResponse;
  });

  await getRoute(MOCKUSER.vin, DEVICEID, TOKENS.access_token, "someTrip");
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});

// tslint:disable-next-line:no-identical-functions
it("should fail getRoute() on HTTP response 200 with no data", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    return { status: 200 } as AxiosResponse;
  });

  let failed = false;
  try {
    await getRoute(MOCKUSER.vin, DEVICEID, TOKENS.access_token, "someTrip");
  } catch (error) {
    failed = true;
  }
  expect(failed).toBeTruthy();
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});

// tslint:disable-next-line:no-identical-functions
it("should fail getRoute() on HTTP response other than 200", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    return { status: 500 } as AxiosResponse;
  });

  let failed = false;
  try {
    await getRoute(MOCKUSER.vin, DEVICEID, TOKENS.access_token, "someTrip");
  } catch (error) {
    failed = true;
  }
  expect(failed).toBeTruthy();
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});

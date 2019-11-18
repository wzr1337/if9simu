// tslint:disable:object-literal-sort-keys variable-name max-union-size no-duplicate-string cognitive-complexity max-line-length
import mockAxios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { DEVICEID, MOCKUSER, TOKENS } from "../constants.mock";
import { IUserInfo } from "../types";
import { getRegisteredClients, getUserInformation, ITokenResponse, login, refreshTokens, registerClient } from "./auth";
import { IF9_BASEURI, IFAS_BASEURI, IFOP_BASEURI } from "./constants";

it("should handle throw error when trying to retrieve tokens", async () => {
  (mockAxios.post as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    throw new Error("fake");
  });
  try {
    await login("totally", "irrelevant");
  } catch (error) {
    expect(true).toBeDefined();
  }
});

it("should retrieve tokens with user/pass", async () => {
  (mockAxios.post as jest.Mock).mockImplementationOnce(async () => {
    return { data: TOKENS } as AxiosResponse;
  });

  const resp: ITokenResponse = await login(MOCKUSER.name, MOCKUSER.password);
  expect(resp.access_token).toEqual(TOKENS.access_token);
  expect(resp.expires_in).toEqual(TOKENS.expires_in);
  expect(resp.refresh_token).toEqual(TOKENS.refresh_token);
  expect(resp.token_type).toEqual(TOKENS.token_type);
  expect(resp.authorization_token).toEqual(TOKENS.authorization_token);
  // finish
  const config = {
    headers: {
      "Authorization": "Basic YXM6YXNwYXNz",
      "Content-Type" : "application/json" },
    };
  const body = {
    grant_type: "password",
    password: MOCKUSER.password,
    username: MOCKUSER.name,
  };
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith(`${IFAS_BASEURI}/jlr/tokens`, body, config);
});

it("should retrieve tokens with refresh_token", async () => {
  (mockAxios.post as jest.Mock).mockImplementationOnce(async () => {
    return { data: TOKENS } as AxiosResponse;
  });

  const resp: ITokenResponse = await refreshTokens(TOKENS.refresh_token);
  expect(resp.access_token).toEqual(TOKENS.access_token);
  expect(resp.expires_in).toEqual(TOKENS.expires_in);
  expect(resp.refresh_token).toEqual(TOKENS.refresh_token);
  expect(resp.token_type).toEqual(TOKENS.token_type);
  expect(resp.authorization_token).toEqual(TOKENS.authorization_token);
  // finish
  const config = {
    headers: {
      "Authorization": "Basic YXM6YXNwYXNz",
      "Content-Type" : "application/json" },
    };
  const body = {
    grant_type: "refresh_token",
    refresh_token: TOKENS.refresh_token,
  };
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith(`${IFAS_BASEURI}/jlr/tokens`, body, config);
});

it("should handle errors gracefully when trying to get user information", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    throw new Error("fake");
  });
  try {
    const resp = await getUserInformation(MOCKUSER.name, DEVICEID, TOKENS.access_token);
  } catch (error) {
    expect(true).toBeDefined();
  }
});

it("should get registered clients", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async () => {
    return { data: {} } as AxiosResponse;
  });
  expect(getRegisteredClients(MOCKUSER.name, TOKENS.access_token)).toBeDefined();

  const config: AxiosRequestConfig = {
    headers: {
      "Authorization": "Bearer " + TOKENS.access_token,
      "Content-Type": "application/json",
    },
  };

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(`${IFOP_BASEURI}/jlr/users/${MOCKUSER.name}/clients`, config);
});

it("should get user information", async () => {
  (mockAxios.get as jest.Mock).mockImplementationOnce(async () => {
    return { data: {
      contact: {
          userPreferences: {
              timeZone: "Europe/Amsterdam",
              unitsOfMeasurement: "Km Litres Celsius VolPerDist kWhPer100Dist kWh",
              dateFormat: "DD.MM.YYYY",
              language: "de_DE",
          },
          firstName: "Tester",
          middleName: null,
          lastName: "JEST",
          title: "dr",
          gender: null,
          birthday: null,
          emailAddress: MOCKUSER.name,
          homePhone: "+4915207197724",
          businessPhone: null,
          mobilePhone: "+4915207197724",
      },
      homeAddress: {
          street: null,
          city: "Wolfsburg",
          zipCode: "38442",
          stateProvince: "Lower Saxony ",
          country: "DE",
          addressLine1: "Osterhop, 54",
          addressLine2: null,
      },
      homeMarket: "DEU",
      userId: MOCKUSER.id,
      loginName: MOCKUSER.name,
      userType: null,
      nextOfKin: null,
      pin: null,
      secureQuestion1: null,
      secureQuestion2: null,
      secureQuestion3: null,
      secureAnswer1: null,
      secureAnswer2: null,
      secureAnswer3: null,
      authCredentials: null,
  } as IUserInfo } as AxiosResponse; });

  const resp = await getUserInformation(MOCKUSER.name, DEVICEID, TOKENS.access_token);

  expect(resp.authCredentials).toBeDefined();
  expect(resp.contact).toBeDefined();
  expect(resp.contact.birthday).toBeDefined();
  expect(resp.contact.businessPhone).toBeDefined();
  expect(resp.contact.emailAddress).toBeDefined();
  expect(resp.contact.firstName).toEqual("Tester");
  expect(resp.contact.gender).toBeDefined();
  expect(resp.contact.homePhone).toBeDefined();
  expect(resp.contact.lastName).toEqual("JEST");
  expect(resp.contact.middleName).toBeDefined();
  expect(resp.contact.mobilePhone).toBeDefined();
  expect(resp.contact.title).toEqual("dr");
  expect(resp.contact.userPreferences).toBeDefined();
  expect(resp.homeAddress).toBeDefined();
  expect(resp.homeMarket).toBeDefined();
  expect(resp.loginName).toBeDefined();
  expect(resp.nextOfKin).toBeDefined();
  expect(resp.pin).toBeDefined();
  expect(resp.secureAnswer1).toBeDefined();
  expect(resp.secureAnswer2).toBeDefined();
  expect(resp.secureAnswer3).toBeDefined();
  expect(resp.secureQuestion1).toBeDefined();
  expect(resp.secureQuestion2).toBeDefined();
  expect(resp.secureQuestion3).toBeDefined();
  expect(resp.userId).toBeDefined();
  expect(resp.userType).toBeDefined();

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": DEVICEID,
      "Authorization": "Bearer " + TOKENS.access_token,
      "X-Requestor": "jlr",
      "Accept": "application/vnd.wirelesscar.ngtp.if9.User-v2+json",
    },
  };

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(`${IF9_BASEURI}/jlr/users?loginName=${MOCKUSER.name}`, config);
});

it("should handle errors gracefully when register a client", async () => {
  (mockAxios.post as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    throw new Error("fake");
  });

  try {
    const resp = await registerClient(MOCKUSER.name, TOKENS.access_token, TOKENS.authorization_token, DEVICEID);
  } catch (error) {
    expect(error.message).toEqual("fake");
  }
});

it("should tolerate failing to register a client", async () => {
  (mockAxios.post as jest.Mock).mockImplementationOnce(async (uri: string, config: AxiosRequestConfig) => {
    return { status: 500 } as AxiosResponse; });

  try {
    const resp = await registerClient(MOCKUSER.name, TOKENS.access_token, TOKENS.authorization_token, DEVICEID);
  } catch (error) {
    expect(error).toBeDefined();
  }
});

it("should register a client", async () => {
  (mockAxios.post as jest.Mock).mockImplementationOnce(async () => {
    return { status: 204 } as AxiosResponse; });

  const resp = await registerClient(MOCKUSER.name, TOKENS.access_token, TOKENS.authorization_token, DEVICEID);

  expect(resp).not.toBeFalsy();

  const config: AxiosRequestConfig = {
    headers: {
      "Authorization": "Basic YXM6YXNwYXNz",
      "Content-Type": "application/json",
    },
  };

  const body = {
    access_token: TOKENS.access_token,
    authorization_token: TOKENS.authorization_token,
    expires_in: TOKENS.expires_in,
    deviceID: DEVICEID,
  };

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  expect(mockAxios.post).toHaveBeenCalledWith(`${IFOP_BASEURI}/jlr/users/${MOCKUSER.name}/clients`, body, config);
});

// tslint:disable:object-literal-sort-keys variable-name max-union-size no-duplicate-string cognitive-complexity
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Logger } from "../Logger";
import { IUserInfo } from "../types";
import { IF9_BASEURI, IFAS_BASEURI, IFOP_BASEURI } from "./constants";

export interface ITokenResponse {
  access_token: string;
  authorization_token: string;
  expires_in: string; // contains number
  refresh_token: string;
  token_type: "bearer";
}
/**
 * logs in a given user and retrieves token set
 *
 * @export
 * @param {string} username
 * @param {string} password
 * @returns {Promise<ITokenResponse>}
 */
export async function login(username: string, password: string): Promise<ITokenResponse> {
  const config: AxiosRequestConfig = {
    headers: {
      "Authorization" : "Basic YXM6YXNwYXNz",
      "Content-Type": "application/json",
    },
  };

  const body = {
    username,
    password,
    grant_type: "password",
  };

  const response: AxiosResponse = await axios.post(`${IFAS_BASEURI}/jlr/tokens`, body, config);
  return response.data as ITokenResponse;
}

/**
 * retrieves new token set by providing refresh token
 *
 * @export
 * @param {string} refreshToken
 * @returns {Promise<ITokenResponse>}
 */
export async function refreshTokens(refreshToken: string): Promise<ITokenResponse> {
  const config: AxiosRequestConfig = {
    headers: {
      "Authorization" : "Basic YXM6YXNwYXNz",
      "Content-Type": "application/json",
    },
  };

  const body = {
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  };

  const response: AxiosResponse = await axios.post(`${IFAS_BASEURI}/jlr/tokens`, body, config);
  return response.data as ITokenResponse;
}

/**
 * registers a client with the backend.
 *
 * !!ATTENTION!!
 * before you can perform any further commands, you need to register with a valid token set
 *
 * @export
 * @param {string} username
 * @param {string} access_token
 * @param {string} authorization_token
 * @param {string} deviceId a random id for the client/device
 * @returns {Promise<boolean>}
 */
export async function registerClient(username: string, access_token: string, authorization_token: string,
                                     deviceId: string): Promise<boolean> {

  const config: AxiosRequestConfig = {
    headers: {
      "Authorization": "Basic YXM6YXNwYXNz",
      "Content-Type": "application/json",
    },
  };

  const body =   {
    access_token,
    authorization_token,
    expires_in: "86400",
    deviceID: deviceId,
  };

  let response: AxiosResponse;
  try {
    response = await axios.post(`${IFOP_BASEURI}/jlr/users/${username}/clients`, body, config);
    if (204 !== response.status) { throw new Error ("Can not register Client"); }
  } catch (error) {
    Logger.error(error.message);
  }
  return true;
}

/**
 * retrieve a list of registered clients
 *
 * @export
 * @param {string} username
 * @param {string} access_token
 * @returns {Promise<{}>}
 */
export async function getRegisteredClients(username: string, access_token: string): Promise<{}> {

  const config: AxiosRequestConfig = {
    headers: {
      "Authorization": "Bearer " + access_token,
      "Content-Type": "application/json",
    },
  };

  const response: AxiosResponse = await axios.get(`${IFOP_BASEURI}/jlr/users/${username}/clients`, config);
  return response.data;
}

/**
 * retrieve user details from backend
 *
 * @export
 * @param {string} username
 * @param {string} deviceId
 * @param {string} access_token
 * @returns {Promise<IUserInfo>}
 */
export async function getUserInformation(username: string, deviceId: string, access_token: string): Promise<IUserInfo> {

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": deviceId,
      "Authorization": "Bearer " + access_token,
      "X-Requestor": "jlr",
      "Accept": "application/vnd.wirelesscar.ngtp.if9.User-v2+json",
    },
  };

  const response: AxiosResponse = await axios.get(`${IF9_BASEURI}/jlr/users?loginName=${username}`, config);
  return response.data as IUserInfo;
}

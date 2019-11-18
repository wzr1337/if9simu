import { IUserInfo } from "../types";
export interface ITokenResponse {
    access_token: string;
    authorization_token: string;
    expires_in: string;
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
export declare function login(username: string, password: string): Promise<ITokenResponse>;
/**
 * retrieves new token set by providing refresh token
 *
 * @export
 * @param {string} refreshToken
 * @returns {Promise<ITokenResponse>}
 */
export declare function refreshTokens(refreshToken: string): Promise<ITokenResponse>;
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
export declare function registerClient(username: string, access_token: string, authorization_token: string, deviceId: string): Promise<boolean>;
/**
 * retrieve a list of registered clients
 *
 * @export
 * @param {string} username
 * @param {string} access_token
 * @returns {Promise<{}>}
 */
export declare function getRegisteredClients(username: string, access_token: string): Promise<{}>;
/**
 * retrieve user details from backend
 *
 * @export
 * @param {string} username
 * @param {string} deviceId
 * @param {string} access_token
 * @returns {Promise<IUserInfo>}
 */
export declare function getUserInformation(username: string, deviceId: string, access_token: string): Promise<IUserInfo>;

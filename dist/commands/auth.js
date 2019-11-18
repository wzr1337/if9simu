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
// tslint:disable:object-literal-sort-keys variable-name max-union-size no-duplicate-string cognitive-complexity
const axios_1 = __importDefault(require("axios"));
const Logger_1 = require("../Logger");
const constants_1 = require("./constants");
/**
 * logs in a given user and retrieves token set
 *
 * @export
 * @param {string} username
 * @param {string} password
 * @returns {Promise<ITokenResponse>}
 */
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            headers: {
                "Authorization": "Basic YXM6YXNwYXNz",
                "Content-Type": "application/json",
            },
        };
        const body = {
            username,
            password,
            grant_type: "password",
        };
        const response = yield axios_1.default.post(`${constants_1.IFAS_BASEURI}/jlr/tokens`, body, config);
        return response.data;
    });
}
exports.login = login;
/**
 * retrieves new token set by providing refresh token
 *
 * @export
 * @param {string} refreshToken
 * @returns {Promise<ITokenResponse>}
 */
function refreshTokens(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            headers: {
                "Authorization": "Basic YXM6YXNwYXNz",
                "Content-Type": "application/json",
            },
        };
        const body = {
            refresh_token: refreshToken,
            grant_type: "refresh_token",
        };
        const response = yield axios_1.default.post(`${constants_1.IFAS_BASEURI}/jlr/tokens`, body, config);
        return response.data;
    });
}
exports.refreshTokens = refreshTokens;
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
function registerClient(username, access_token, authorization_token, deviceId) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            headers: {
                "Authorization": "Basic YXM6YXNwYXNz",
                "Content-Type": "application/json",
            },
        };
        const body = {
            access_token,
            authorization_token,
            expires_in: "86400",
            deviceID: deviceId,
        };
        let response;
        try {
            response = yield axios_1.default.post(`${constants_1.IFOP_BASEURI}/jlr/users/${username}/clients`, body, config);
            if (204 !== response.status) {
                throw new Error("Can not register Client");
            }
        }
        catch (error) {
            Logger_1.Logger.error(error.message);
        }
        return true;
    });
}
exports.registerClient = registerClient;
/**
 * retrieve a list of registered clients
 *
 * @export
 * @param {string} username
 * @param {string} access_token
 * @returns {Promise<{}>}
 */
function getRegisteredClients(username, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json",
            },
        };
        const response = yield axios_1.default.get(`${constants_1.IFOP_BASEURI}/jlr/users/${username}/clients`, config);
        return response.data;
    });
}
exports.getRegisteredClients = getRegisteredClients;
/**
 * retrieve user details from backend
 *
 * @export
 * @param {string} username
 * @param {string} deviceId
 * @param {string} access_token
 * @returns {Promise<IUserInfo>}
 */
function getUserInformation(username, deviceId, access_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "X-Device-Id": deviceId,
                "Authorization": "Bearer " + access_token,
                "X-Requestor": "jlr",
                "Accept": "application/vnd.wirelesscar.ngtp.if9.User-v2+json",
            },
        };
        const response = yield axios_1.default.get(`${constants_1.IF9_BASEURI}/jlr/users?loginName=${username}`, config);
        return response.data;
    });
}
exports.getUserInformation = getUserInformation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxnSEFBZ0g7QUFDaEgsa0RBQWlFO0FBQ2pFLHNDQUFtQztBQUVuQywyQ0FBc0U7QUFTdEU7Ozs7Ozs7R0FPRztBQUNILGVBQTRCLFFBQWdCLEVBQUUsUUFBZ0I7O1FBQzVELE1BQU0sTUFBTSxHQUF1QjtZQUNqQyxPQUFPLEVBQUU7Z0JBQ1AsZUFBZSxFQUFHLG9CQUFvQjtnQkFDdEMsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztTQUNGLENBQUM7UUFFRixNQUFNLElBQUksR0FBRztZQUNYLFFBQVE7WUFDUixRQUFRO1lBQ1IsVUFBVSxFQUFFLFVBQVU7U0FDdkIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFrQixNQUFNLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyx3QkFBWSxhQUFhLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdGLE9BQU8sUUFBUSxDQUFDLElBQXNCLENBQUM7SUFDekMsQ0FBQztDQUFBO0FBaEJELHNCQWdCQztBQUVEOzs7Ozs7R0FNRztBQUNILHVCQUFvQyxZQUFvQjs7UUFDdEQsTUFBTSxNQUFNLEdBQXVCO1lBQ2pDLE9BQU8sRUFBRTtnQkFDUCxlQUFlLEVBQUcsb0JBQW9CO2dCQUN0QyxjQUFjLEVBQUUsa0JBQWtCO2FBQ25DO1NBQ0YsQ0FBQztRQUVGLE1BQU0sSUFBSSxHQUFHO1lBQ1gsYUFBYSxFQUFFLFlBQVk7WUFDM0IsVUFBVSxFQUFFLGVBQWU7U0FDNUIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFrQixNQUFNLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyx3QkFBWSxhQUFhLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdGLE9BQU8sUUFBUSxDQUFDLElBQXNCLENBQUM7SUFDekMsQ0FBQztDQUFBO0FBZkQsc0NBZUM7QUFFRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCx3QkFBcUMsUUFBZ0IsRUFBRSxZQUFvQixFQUFFLG1CQUEyQixFQUNuRSxRQUFnQjs7UUFFbkQsTUFBTSxNQUFNLEdBQXVCO1lBQ2pDLE9BQU8sRUFBRTtnQkFDUCxlQUFlLEVBQUUsb0JBQW9CO2dCQUNyQyxjQUFjLEVBQUUsa0JBQWtCO2FBQ25DO1NBQ0YsQ0FBQztRQUVGLE1BQU0sSUFBSSxHQUFLO1lBQ2IsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQixVQUFVLEVBQUUsT0FBTztZQUNuQixRQUFRLEVBQUUsUUFBUTtTQUNuQixDQUFDO1FBRUYsSUFBSSxRQUF1QixDQUFDO1FBQzVCLElBQUk7WUFDRixRQUFRLEdBQUcsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsd0JBQVksY0FBYyxRQUFRLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDM0YsSUFBSSxHQUFHLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFFLHlCQUF5QixDQUFDLENBQUM7YUFBRTtTQUM5RTtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsZUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FBQTtBQXpCRCx3Q0F5QkM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsOEJBQTJDLFFBQWdCLEVBQUUsWUFBb0I7O1FBRS9FLE1BQU0sTUFBTSxHQUF1QjtZQUNqQyxPQUFPLEVBQUU7Z0JBQ1AsZUFBZSxFQUFFLFNBQVMsR0FBRyxZQUFZO2dCQUN6QyxjQUFjLEVBQUUsa0JBQWtCO2FBQ25DO1NBQ0YsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFrQixNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyx3QkFBWSxjQUFjLFFBQVEsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pHLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztJQUN2QixDQUFDO0NBQUE7QUFYRCxvREFXQztBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsNEJBQXlDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxZQUFvQjs7UUFFL0YsTUFBTSxNQUFNLEdBQXVCO1lBQ2pDLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxhQUFhLEVBQUUsUUFBUTtnQkFDdkIsZUFBZSxFQUFFLFNBQVMsR0FBRyxZQUFZO2dCQUN6QyxhQUFhLEVBQUUsS0FBSztnQkFDcEIsUUFBUSxFQUFFLG1EQUFtRDthQUM5RDtTQUNGLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBa0IsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsdUJBQVcsd0JBQXdCLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFHLE9BQU8sUUFBUSxDQUFDLElBQWlCLENBQUM7SUFDcEMsQ0FBQztDQUFBO0FBZEQsZ0RBY0MifQ==
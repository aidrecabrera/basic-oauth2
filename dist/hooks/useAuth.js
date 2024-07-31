"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var react_1 = require("react");
var authBaseUrl_1 = require("../constants/authBaseUrl");
/**
 * Custom hook for handling authentication and authorization using Microsoft.AspNetCore.Identity.EntityFrameworkCore.
 * @returns {object} - the necessary objects for authentication and authorization.
 */
var useAuth = function () {
    var _a = (0, react_1.useState)(null), accessToken = _a[0], setAccessToken = _a[1];
    var _b = (0, react_1.useState)(null), refreshToken = _b[0], setRefreshToken = _b[1];
    /**
     * handles the response from authentication requests.
     * @param {AxiosResponse<AccessTokenResponse>} response - the response from the authentication request.
     */
    var handleResponse = (0, react_1.useCallback)(function (response) {
        setAccessToken(response.data.accessToken || null);
        setRefreshToken(response.data.refreshToken || null);
    }, []);
    /**
     * registers a new user using the automatically generated API endpoint.
     * @param {RegisterRequest} data - the registration data.
     * @returns {Promise<void>}
     */
    var register = (0, react_1.useCallback)(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("".concat((0, authBaseUrl_1.getApiBaseUrl)(), "/register"), data)];
                case 1:
                    response = _a.sent();
                    handleResponse(response);
                    return [2 /*return*/];
            }
        });
    }); }, [handleResponse]);
    /**
     * logs in a user using the automatically generated API endpoint.
     * @param {LoginRequest} data - the login data.
     * @returns {Promise<void>}
     */
    var login = (0, react_1.useCallback)(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("".concat((0, authBaseUrl_1.getApiBaseUrl)(), "/login"), data)];
                case 1:
                    response = _a.sent();
                    handleResponse(response);
                    return [2 /*return*/];
            }
        });
    }); }, [handleResponse]);
    /**
     * refreshes the access token using the automatically generated API endpoint.
     * @param {RefreshRequest} data - the refresh token data.
     * @returns {Promise<void>}
     */
    var refresh = (0, react_1.useCallback)(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("".concat((0, authBaseUrl_1.getApiBaseUrl)(), "/refresh"), data)];
                case 1:
                    response = _a.sent();
                    handleResponse(response);
                    return [2 /*return*/];
            }
        });
    }); }, [handleResponse]);
    /**
     * resends the confirmation email using the automatically generated API endpoint.
     * @param {ResendConfirmationEmailRequest} data - the email data.
     * @returns {Promise<void>}
     */
    var resendConfirmationEmail = (0, react_1.useCallback)(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("".concat((0, authBaseUrl_1.getApiBaseUrl)(), "/resendConfirmationEmail"), data)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, []);
    /**
     * initiates the password reset process using the automatically generated API endpoint.
     * @param {ForgotPasswordRequest} data - the email data.
     * @returns {Promise<void>}
     */
    var forgotPassword = (0, react_1.useCallback)(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("".concat((0, authBaseUrl_1.getApiBaseUrl)(), "/forgotPassword"), data)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, []);
    /**
     * resets the password using the automatically generated API endpoint.
     * @param {ResetPasswordRequest} data - the reset password data.
     * @returns {Promise<void>}
     */
    var resetPassword = (0, react_1.useCallback)(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("".concat((0, authBaseUrl_1.getApiBaseUrl)(), "/resetPassword"), data)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, []);
    /**
     * manages two-factor authentication settings using the automatically generated API endpoint.
     * @param {TwoFactorRequest} data - the two-factor authentication data.
     * @returns {Promise<any>} - the response data.
     */
    var manageTwoFactor = (0, react_1.useCallback)(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("".concat((0, authBaseUrl_1.getApiBaseUrl)(), "/manage/2fa"), data, {
                        headers: {
                            Authorization: "Bearer ".concat(accessToken),
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    }); }, [accessToken]);
    /**
     * retrieves the user's information using the automatically generated API endpoint.
     * @returns {Promise<InfoResponse>} - the user's information.
     */
    var getInfo = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("".concat((0, authBaseUrl_1.getApiBaseUrl)(), "/manage/info"), {
                        headers: {
                            Authorization: "Bearer ".concat(accessToken),
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    }); }, [accessToken]);
    /**
     * updates the user's information using the automatically generated API endpoint.
     * @param {InfoRequest} data - the information data.
     * @returns {Promise<InfoResponse>} - the updated information.
     */
    var updateInfo = (0, react_1.useCallback)(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("".concat((0, authBaseUrl_1.getApiBaseUrl)(), "/manage/info"), data, {
                        headers: {
                            Authorization: "Bearer ".concat(accessToken),
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    }); }, [accessToken]);
    return {
        register: register,
        login: login,
        refresh: refresh,
        resendConfirmationEmail: resendConfirmationEmail,
        forgotPassword: forgotPassword,
        resetPassword: resetPassword,
        manageTwoFactor: manageTwoFactor,
        getInfo: getInfo,
        updateInfo: updateInfo,
        accessToken: accessToken,
        refreshToken: refreshToken,
        setApiBaseUrl: authBaseUrl_1.setApiBaseUrl,
    };
};
exports.default = useAuth;

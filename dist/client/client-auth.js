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
var authBaseUrl_1 = require("../constants/authBaseUrl");
/**
 * !NOTE: Currently experimenting whether to use cookies or local storage.
 */
/**
 * Helper functions to manage cookies
 */
var cookieHelper = {
    getCookie: function (name) {
        var _a;
        var value = "; ".concat(document.cookie);
        var parts = value.split("; ".concat(name, "="));
        if (parts.length === 2)
            return (_a = parts.pop()) === null || _a === void 0 ? void 0 : _a.split(";").shift();
        return null;
    },
    setCookie: function (name, value, days) {
        var expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = "".concat(name, "=").concat(value, "; expires=").concat(expires, "; path=/; secure; HttpOnly; SameSite=Strict");
    },
    deleteCookie: function (name) {
        document.cookie = "".concat(name, "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; HttpOnly; SameSite=Strict");
    },
};
/**
 * Axios instance with base URL and interceptors for token management.
 */
var apiClient = axios_1.default.create({
    baseURL: (0, authBaseUrl_1.getApiBaseUrl)(),
});
apiClient.interceptors.request.use(function (config) {
    var accessToken = cookieHelper.getCookie("accessToken");
    if (accessToken) {
        config.headers.Authorization = "Bearer ".concat(accessToken);
    }
    return config;
}, function (error) { return Promise.reject(error); });
apiClient.interceptors.response.use(function (response) { return response; }, function (error) { return __awaiter(void 0, void 0, void 0, function () {
    var originalRequest, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                originalRequest = error.config;
                if (!(error.response.status === 401 && !originalRequest._retry)) return [3 /*break*/, 2];
                originalRequest._retry = true;
                return [4 /*yield*/, AuthClient.refresh()];
            case 1:
                _a.sent();
                accessToken = cookieHelper.getCookie("accessToken");
                originalRequest.headers.Authorization = "Bearer ".concat(accessToken);
                return [2 /*return*/, apiClient(originalRequest)];
            case 2: return [2 /*return*/, Promise.reject(error)];
        }
    });
}); });
/**
 * AuthClient class to handle authentication and authorization.
 */
var AuthClient = /** @class */ (function () {
    function AuthClient() {
    }
    /**
     * Handles the response from authentication requests.
     * @param {AxiosResponse<AccessTokenResponse>} response - The response from the authentication request.
     */
    AuthClient.handleResponse = function (response) {
        AuthClient.accessToken = response.data.accessToken || null;
        AuthClient.refreshToken = response.data.refreshToken || null;
        cookieHelper.setCookie("accessToken", AuthClient.accessToken || "", response.data.expiresIn / 86400);
        cookieHelper.setCookie("refreshToken", AuthClient.refreshToken || "", 7); // Set refresh token for 7 days
    };
    /**
     * Registers a new user using the automatically generated API endpoint.
     * @param {RegisterRequest} data - The registration data.
     * @returns {Promise<void>}
     */
    AuthClient.register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, apiClient.post("/register", data)];
                    case 1:
                        response = _a.sent();
                        AuthClient.handleResponse(response);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("An error occurred during registration", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Logs in a user using the automatically generated API endpoint.
     * @param {LoginRequest} data - The login data.
     * @returns {Promise<void>}
     */
    AuthClient.login = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, apiClient.post("/login", data)];
                    case 1:
                        response = _a.sent();
                        AuthClient.handleResponse(response);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error("An error occurred during login", error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Refreshes the access token using the automatically generated API endpoint.
     * @returns {Promise<void>}
     */
    AuthClient.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, apiClient.post("/refresh", {
                                refreshToken: AuthClient.refreshToken,
                            })];
                    case 1:
                        response = _a.sent();
                        AuthClient.handleResponse(response);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error("An error occurred during token refresh", error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Resends the confirmation email using the automatically generated API endpoint.
     * @param {ResendConfirmationEmailRequest} data - The email data.
     * @returns {Promise<void>}
     */
    AuthClient.resendConfirmationEmail = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, apiClient.post("/resendConfirmationEmail", data)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error("An error occurred during resending confirmation email", error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Initiates the password reset process using the automatically generated API endpoint.
     * @param {ForgotPasswordRequest} data - The email data.
     * @returns {Promise<void>}
     */
    AuthClient.forgotPassword = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, apiClient.post("/forgotPassword", data)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error("An error occurred during forgot password", error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Resets the password using the automatically generated API endpoint.
     * @param {ResetPasswordRequest} data - The reset password data.
     * @returns {Promise<void>}
     */
    AuthClient.resetPassword = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, apiClient.post("/resetPassword", data)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.error("An error occurred during reset password", error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Manages two-factor authentication settings using the automatically generated API endpoint.
     * @param {TwoFactorRequest} data - The two-factor authentication data.
     * @returns {Promise<any>} - The response data.
     */
    AuthClient.manageTwoFactor = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, apiClient.post("/manage/2fa", data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_7 = _a.sent();
                        console.error("An error occurred during managing two-factor authentication", error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves the user's information using the automatically generated API endpoint.
     * @returns {Promise<InfoResponse>} - The user's information.
     */
    AuthClient.getInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, apiClient.get("/manage/info")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_8 = _a.sent();
                        console.error("An error occurred during fetching user info", error_8);
                        throw error_8;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates the user's information using the automatically generated API endpoint.
     * @param {InfoRequest} data - The information data.
     * @returns {Promise<InfoResponse>} - The updated information.
     */
    AuthClient.updateInfo = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, apiClient.post("/manage/info", data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_9 = _a.sent();
                        console.error("An error occurred during updating user info", error_9);
                        throw error_9;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Logs out the user by clearing tokens and user data.
     */
    AuthClient.logout = function () {
        AuthClient.accessToken = null;
        AuthClient.refreshToken = null;
        cookieHelper.deleteCookie("accessToken");
        cookieHelper.deleteCookie("refreshToken");
    };
    /**
     * Gets the current access token.
     * @returns {string | null} - The current access token.
     */
    AuthClient.getAccessToken = function () {
        return AuthClient.accessToken || null;
    };
    AuthClient.accessToken = cookieHelper.getCookie("accessToken");
    AuthClient.refreshToken = cookieHelper.getCookie("refreshToken");
    return AuthClient;
}());
exports.default = AuthClient;

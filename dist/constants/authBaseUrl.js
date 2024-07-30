"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = exports.setApiBaseUrl = void 0;
var API_BASE_URL = ""; // Default API base URL
/**
 * Sets the base URL for the API.
 * @param {string} url - The new API base URL.
 */
var setApiBaseUrl = function (url) {
    API_BASE_URL = url;
};
exports.setApiBaseUrl = setApiBaseUrl;
/**
 * Gets the current API base URL.
 * @returns {string} - The current API base URL.
 */
var getApiBaseUrl = function () { return API_BASE_URL; };
exports.getApiBaseUrl = getApiBaseUrl;

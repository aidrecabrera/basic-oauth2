let API_BASE_URL = ""; // Default API base URL

/**
 * Sets the base URL for the API.
 * @param {string} url - The new API base URL.
 */
export const setApiBaseUrl = (url: string) => {
  API_BASE_URL = url;
};

/**
 * Gets the current API base URL.
 * @returns {string} - The current API base URL.
 */
export const getApiBaseUrl = (): string => API_BASE_URL;

import axios, { AxiosResponse } from "axios";
import { getApiBaseUrl } from "../constants/authBaseUrl";
import {
  AccessTokenResponse,
  ForgotPasswordRequest,
  InfoRequest,
  InfoResponse,
  LoginRequest,
  RegisterRequest,
  ResendConfirmationEmailRequest,
  ResetPasswordRequest,
  TwoFactorRequest,
} from "../types/authInterfaces";

/**
 * !NOTE: Currently experimenting whether to use cookies or local storage.
 */

/**
 * Helper functions to manage cookies
 */
const cookieHelper = {
  getCookie: (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  },
  setCookie: (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; secure; HttpOnly; SameSite=Strict`;
  },
  deleteCookie: (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; HttpOnly; SameSite=Strict`;
  },
};

/**
 * Axios instance with base URL and interceptors for token management.
 */
const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = cookieHelper.getCookie("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await AuthClient.refresh();
      const accessToken = cookieHelper.getCookie("accessToken");
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

/**
 * AuthClient class to handle authentication and authorization.
 */
class AuthClient {
  private static accessToken: string | null | undefined =
    cookieHelper.getCookie("accessToken");
  private static refreshToken: string | null | undefined =
    cookieHelper.getCookie("refreshToken");

  /**
   * Handles the response from authentication requests.
   * @param {AxiosResponse<AccessTokenResponse>} response - The response from the authentication request.
   */
  private static handleResponse(response: AxiosResponse<AccessTokenResponse>) {
    AuthClient.accessToken = response.data.accessToken || null;
    AuthClient.refreshToken = response.data.refreshToken || null;

    cookieHelper.setCookie(
      "accessToken",
      AuthClient.accessToken || "",
      response.data.expiresIn / 86400
    );
    cookieHelper.setCookie("refreshToken", AuthClient.refreshToken || "", 7); // Set refresh token for 7 days
  }

  /**
   * Registers a new user using the automatically generated API endpoint.
   * @param {RegisterRequest} data - The registration data.
   * @returns {Promise<void>}
   */
  public static async register(data: RegisterRequest): Promise<void> {
    try {
      const response = await apiClient.post<AccessTokenResponse>(
        "/register",
        data
      );
      AuthClient.handleResponse(response);
    } catch (error) {
      console.error("An error occurred during registration", error);
    }
  }

  /**
   * Logs in a user using the automatically generated API endpoint.
   * @param {LoginRequest} data - The login data.
   * @returns {Promise<void>}
   */
  public static async login(data: LoginRequest): Promise<void> {
    try {
      const response = await apiClient.post<AccessTokenResponse>(
        "/login",
        data
      );
      AuthClient.handleResponse(response);
    } catch (error) {
      console.error("An error occurred during login", error);
    }
  }

  /**
   * Refreshes the access token using the automatically generated API endpoint.
   * @returns {Promise<void>}
   */
  public static async refresh(): Promise<void> {
    try {
      const response = await apiClient.post<AccessTokenResponse>("/refresh", {
        refreshToken: AuthClient.refreshToken,
      });
      AuthClient.handleResponse(response);
    } catch (error) {
      console.error("An error occurred during token refresh", error);
    }
  }

  /**
   * Resends the confirmation email using the automatically generated API endpoint.
   * @param {ResendConfirmationEmailRequest} data - The email data.
   * @returns {Promise<void>}
   */
  public static async resendConfirmationEmail(
    data: ResendConfirmationEmailRequest
  ): Promise<void> {
    try {
      await apiClient.post("/resendConfirmationEmail", data);
    } catch (error) {
      console.error(
        "An error occurred during resending confirmation email",
        error
      );
    }
  }

  /**
   * Initiates the password reset process using the automatically generated API endpoint.
   * @param {ForgotPasswordRequest} data - The email data.
   * @returns {Promise<void>}
   */
  public static async forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<void> {
    try {
      await apiClient.post("/forgotPassword", data);
    } catch (error) {
      console.error("An error occurred during forgot password", error);
    }
  }

  /**
   * Resets the password using the automatically generated API endpoint.
   * @param {ResetPasswordRequest} data - The reset password data.
   * @returns {Promise<void>}
   */
  public static async resetPassword(data: ResetPasswordRequest): Promise<void> {
    try {
      await apiClient.post("/resetPassword", data);
    } catch (error) {
      console.error("An error occurred during reset password", error);
    }
  }

  /**
   * Manages two-factor authentication settings using the automatically generated API endpoint.
   * @param {TwoFactorRequest} data - The two-factor authentication data.
   * @returns {Promise<any>} - The response data.
   */
  public static async manageTwoFactor(data: TwoFactorRequest): Promise<any> {
    try {
      const response = await apiClient.post("/manage/2fa", data);
      return response.data;
    } catch (error) {
      console.error(
        "An error occurred during managing two-factor authentication",
        error
      );
    }
  }

  /**
   * Retrieves the user's information using the automatically generated API endpoint.
   * @returns {Promise<InfoResponse>} - The user's information.
   */
  public static async getInfo(): Promise<InfoResponse> {
    try {
      const response = await apiClient.get<InfoResponse>("/manage/info");
      return response.data;
    } catch (error) {
      console.error("An error occurred during fetching user info", error);
      throw error;
    }
  }

  /**
   * Updates the user's information using the automatically generated API endpoint.
   * @param {InfoRequest} data - The information data.
   * @returns {Promise<InfoResponse>} - The updated information.
   */
  public static async updateInfo(data: InfoRequest): Promise<InfoResponse> {
    try {
      const response = await apiClient.post<InfoResponse>("/manage/info", data);
      return response.data;
    } catch (error) {
      console.error("An error occurred during updating user info", error);
      throw error;
    }
  }

  /**
   * Logs out the user by clearing tokens and user data.
   */
  public static logout() {
    AuthClient.accessToken = null;
    AuthClient.refreshToken = null;
    cookieHelper.deleteCookie("accessToken");
    cookieHelper.deleteCookie("refreshToken");
  }

  /**
   * Gets the current access token.
   * @returns {string | null} - The current access token.
   */
  public static getAccessToken(): string | null {
    return AuthClient.accessToken || null;
  }
}

export default AuthClient;

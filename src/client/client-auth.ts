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
 * Handles token storage based on the environment.
 */
const tokenStorage = {
  getItem: (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },
};

/**
 * AuthClient class to handle authentication and authorization.
 */
class AuthClient {
  private static accessToken: string | null =
    tokenStorage.getItem("accessToken");
  private static refreshToken: string | null =
    tokenStorage.getItem("refreshToken");

  /**
   * Handles the response from authentication requests.
   * @param {AxiosResponse<AccessTokenResponse>} response - The response from the authentication request.
   */
  private static handleResponse(response: AxiosResponse<AccessTokenResponse>) {
    AuthClient.accessToken = response.data.accessToken || null;
    AuthClient.refreshToken = response.data.refreshToken || null;

    tokenStorage.setItem("accessToken", AuthClient.accessToken || "");
    tokenStorage.setItem("refreshToken", AuthClient.refreshToken || "");
  }

  /**
   * Registers a new user using the automatically generated API endpoint.
   * @param {RegisterRequest} data - The registration data.
   * @returns {Promise<void>}
   */
  public static async register(data: RegisterRequest): Promise<void> {
    try {
      const response = await axios.post<AccessTokenResponse>(
        `${getApiBaseUrl()}/register`,
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
      const response = await axios.post<AccessTokenResponse>(
        `${getApiBaseUrl()}/login`,
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
      const response = await axios.post<AccessTokenResponse>(
        `${getApiBaseUrl()}/refresh`,
        {
          refreshToken: AuthClient.refreshToken,
        }
      );
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
      await axios.post(`${getApiBaseUrl()}/resendConfirmationEmail`, data);
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
      await axios.post(`${getApiBaseUrl()}/forgotPassword`, data);
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
      await axios.post(`${getApiBaseUrl()}/resetPassword`, data);
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
      const response = await axios.post(`${getApiBaseUrl()}/manage/2fa`, data, {
        headers: {
          Authorization: `Bearer ${AuthClient.accessToken}`,
        },
      });
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
      const response = await axios.get<InfoResponse>(
        `${getApiBaseUrl()}/manage/info`,
        {
          headers: {
            Authorization: `Bearer ${AuthClient.accessToken}`,
          },
        }
      );
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
      const response = await axios.post<InfoResponse>(
        `${getApiBaseUrl()}/manage/info`,
        data,
        {
          headers: {
            Authorization: `Bearer ${AuthClient.accessToken}`,
          },
        }
      );
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
    tokenStorage.removeItem("accessToken");
    tokenStorage.removeItem("refreshToken");
  }

  /**
   * Gets the current access token.
   * @returns {string | null} - The current access token.
   */
  public static getAccessToken(): string | null {
    return AuthClient.accessToken;
  }
}

export default AuthClient;

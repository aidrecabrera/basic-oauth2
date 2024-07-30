import axios, { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { getApiBaseUrl, setApiBaseUrl } from "../constants/authBaseUrl";
import {
  AccessTokenResponse,
  ForgotPasswordRequest,
  InfoRequest,
  InfoResponse,
  LoginRequest,
  RefreshRequest,
  RegisterRequest,
  ResendConfirmationEmailRequest,
  ResetPasswordRequest,
  TwoFactorRequest,
} from "../types/authInterfaces";

/**
 * Custom hook for handling authentication and authorization using Microsoft.AspNetCore.Identity.EntityFrameworkCore.
 * @returns {object} - the necessary objects for authentication and authorization.
 */
const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  /**
   * handles the response from authentication requests.
   * @param {AxiosResponse<AccessTokenResponse>} response - the response from the authentication request.
   */
  const handleResponse = useCallback(
    (response: AxiosResponse<AccessTokenResponse>) => {
      setAccessToken(response.data.accessToken || null);
      setRefreshToken(response.data.refreshToken || null);
    },
    []
  );

  /**
   * registers a new user using the automatically generated API endpoint.
   * @param {RegisterRequest} data - the registration data.
   * @returns {Promise<void>}
   */
  const register = useCallback(
    async (data: RegisterRequest): Promise<void> => {
      const response = await axios.post<AccessTokenResponse>(
        `${getApiBaseUrl()}/register`,
        data
      );
      handleResponse(response);
    },
    [handleResponse]
  );

  /**
   * logs in a user using the automatically generated API endpoint.
   * @param {LoginRequest} data - the login data.
   * @returns {Promise<void>}
   */
  const login = useCallback(
    async (data: LoginRequest): Promise<void> => {
      const response = await axios.post<AccessTokenResponse>(
        `${getApiBaseUrl()}/login`,
        data
      );
      handleResponse(response);
    },
    [handleResponse]
  );

  /**
   * refreshes the access token using the automatically generated API endpoint.
   * @param {RefreshRequest} data - the refresh token data.
   * @returns {Promise<void>}
   */
  const refresh = useCallback(
    async (data: RefreshRequest): Promise<void> => {
      const response = await axios.post<AccessTokenResponse>(
        `${getApiBaseUrl()}/refresh`,
        data
      );
      handleResponse(response);
    },
    [handleResponse]
  );

  /**
   * resends the confirmation email using the automatically generated API endpoint.
   * @param {ResendConfirmationEmailRequest} data - the email data.
   * @returns {Promise<void>}
   */
  const resendConfirmationEmail = useCallback(
    async (data: ResendConfirmationEmailRequest): Promise<void> => {
      await axios.post(`${getApiBaseUrl()}/resendConfirmationEmail`, data);
    },
    []
  );

  /**
   * initiates the password reset process using the automatically generated API endpoint.
   * @param {ForgotPasswordRequest} data - the email data.
   * @returns {Promise<void>}
   */
  const forgotPassword = useCallback(
    async (data: ForgotPasswordRequest): Promise<void> => {
      await axios.post(`${getApiBaseUrl()}/forgotPassword`, data);
    },
    []
  );

  /**
   * resets the password using the automatically generated API endpoint.
   * @param {ResetPasswordRequest} data - the reset password data.
   * @returns {Promise<void>}
   */
  const resetPassword = useCallback(
    async (data: ResetPasswordRequest): Promise<void> => {
      await axios.post(`${getApiBaseUrl()}/resetPassword`, data);
    },
    []
  );

  /**
   * manages two-factor authentication settings using the automatically generated API endpoint.
   * @param {TwoFactorRequest} data - the two-factor authentication data.
   * @returns {Promise<any>} - the response data.
   */
  const manageTwoFactor = useCallback(
    async (data: TwoFactorRequest): Promise<any> => {
      const response = await axios.post(`${getApiBaseUrl()}/manage/2fa`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    },
    [accessToken]
  );

  /**
   * retrieves the user's information using the automatically generated API endpoint.
   * @returns {Promise<InfoResponse>} - the user's information.
   */
  const getInfo = useCallback(async (): Promise<InfoResponse> => {
    const response = await axios.get<InfoResponse>(
      `${getApiBaseUrl()}/manage/info`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }, [accessToken]);

  /**
   * updates the user's information using the automatically generated API endpoint.
   * @param {InfoRequest} data - the information data.
   * @returns {Promise<InfoResponse>} - the updated information.
   */
  const updateInfo = useCallback(
    async (data: InfoRequest): Promise<InfoResponse> => {
      const response = await axios.post<InfoResponse>(
        `${getApiBaseUrl()}/manage/info`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    },
    [accessToken]
  );

  return {
    register,
    login,
    refresh,
    resendConfirmationEmail,
    forgotPassword,
    resetPassword,
    manageTwoFactor,
    getInfo,
    updateInfo,
    accessToken,
    refreshToken,
    setApiBaseUrl,
  };
};

export default useAuth;

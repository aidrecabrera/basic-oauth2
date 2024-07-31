import { ForgotPasswordRequest, InfoRequest, InfoResponse, LoginRequest, RegisterRequest, ResendConfirmationEmailRequest, ResetPasswordRequest, TwoFactorRequest } from "../types/authInterfaces";
/**
 * AuthClient class to handle authentication and authorization.
 */
declare class AuthClient {
    private static accessToken;
    private static refreshToken;
    /**
     * Handles the response from authentication requests.
     * @param {AxiosResponse<AccessTokenResponse>} response - The response from the authentication request.
     */
    private static handleResponse;
    /**
     * Registers a new user using the automatically generated API endpoint.
     * @param {RegisterRequest} data - The registration data.
     * @returns {Promise<void>}
     */
    static register(data: RegisterRequest): Promise<void>;
    /**
     * Logs in a user using the automatically generated API endpoint.
     * @param {LoginRequest} data - The login data.
     * @returns {Promise<void>}
     */
    static login(data: LoginRequest): Promise<void>;
    /**
     * Refreshes the access token using the automatically generated API endpoint.
     * @returns {Promise<void>}
     */
    static refresh(): Promise<void>;
    /**
     * Resends the confirmation email using the automatically generated API endpoint.
     * @param {ResendConfirmationEmailRequest} data - The email data.
     * @returns {Promise<void>}
     */
    static resendConfirmationEmail(data: ResendConfirmationEmailRequest): Promise<void>;
    /**
     * Initiates the password reset process using the automatically generated API endpoint.
     * @param {ForgotPasswordRequest} data - The email data.
     * @returns {Promise<void>}
     */
    static forgotPassword(data: ForgotPasswordRequest): Promise<void>;
    /**
     * Resets the password using the automatically generated API endpoint.
     * @param {ResetPasswordRequest} data - The reset password data.
     * @returns {Promise<void>}
     */
    static resetPassword(data: ResetPasswordRequest): Promise<void>;
    /**
     * Manages two-factor authentication settings using the automatically generated API endpoint.
     * @param {TwoFactorRequest} data - The two-factor authentication data.
     * @returns {Promise<any>} - The response data.
     */
    static manageTwoFactor(data: TwoFactorRequest): Promise<any>;
    /**
     * Retrieves the user's information using the automatically generated API endpoint.
     * @returns {Promise<InfoResponse>} - The user's information.
     */
    static getInfo(): Promise<InfoResponse>;
    /**
     * Updates the user's information using the automatically generated API endpoint.
     * @param {InfoRequest} data - The information data.
     * @returns {Promise<InfoResponse>} - The updated information.
     */
    static updateInfo(data: InfoRequest): Promise<InfoResponse>;
    /**
     * Logs out the user by clearing tokens and user data.
     */
    static logout(): void;
    /**
     * Gets the current access token.
     * @returns {string | null} - The current access token.
     */
    static getAccessToken(): string | null;
}
export default AuthClient;

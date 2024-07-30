import { ForgotPasswordRequest, InfoRequest, InfoResponse, LoginRequest, RefreshRequest, RegisterRequest, ResendConfirmationEmailRequest, ResetPasswordRequest, TwoFactorRequest } from "../types/authInterfaces";
/**
 * Custom hook for handling authentication and authorization using Microsoft.AspNetCore.Identity.EntityFrameworkCore.
 * @returns {object} - the necessary objects for authentication and authorization.
 */
declare const useAuth: () => {
    register: (data: RegisterRequest) => Promise<void>;
    login: (data: LoginRequest) => Promise<void>;
    refresh: (data: RefreshRequest) => Promise<void>;
    resendConfirmationEmail: (data: ResendConfirmationEmailRequest) => Promise<void>;
    forgotPassword: (data: ForgotPasswordRequest) => Promise<void>;
    resetPassword: (data: ResetPasswordRequest) => Promise<void>;
    manageTwoFactor: (data: TwoFactorRequest) => Promise<any>;
    getInfo: () => Promise<InfoResponse>;
    updateInfo: (data: InfoRequest) => Promise<InfoResponse>;
    accessToken: string | null;
    refreshToken: string | null;
    setApiBaseUrl: (url: string) => void;
};
export default useAuth;

export interface RegisterRequest {
    email: string;
    password: string;
}
export interface LoginRequest {
    email: string;
    password: string;
    twoFactorCode?: string;
    twoFactorRecoveryCode?: string;
}
export interface RefreshRequest {
    refreshToken: string;
}
export interface ResendConfirmationEmailRequest {
    email: string;
}
export interface ForgotPasswordRequest {
    email: string;
}
export interface ResetPasswordRequest {
    email: string;
    resetCode: string;
    newPassword: string;
}
export interface TwoFactorRequest {
    enable?: boolean;
    twoFactorCode?: string;
    resetSharedKey: boolean;
    resetRecoveryCodes: boolean;
    forgetMachine: boolean;
}
export interface InfoRequest {
    newEmail?: string;
    newPassword?: string;
    oldPassword?: string;
}
export interface AccessTokenResponse {
    tokenType?: string;
    accessToken?: string;
    expiresIn: number;
    refreshToken?: string;
}
export interface InfoResponse {
    email?: string;
    isEmailConfirmed: boolean;
}

export type GenerateQrCodeParams = {
    user_id: string;
    email: string;
};

export type OtpResponse = {
    otp_auth_url: string;
    base32_secret: string;
};
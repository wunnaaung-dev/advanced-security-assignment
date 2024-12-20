import { authApi } from "@/api/authAPI";
import { GenerateQrCodeParams, OtpResponse } from "@/types/QR";
import { User } from "@/types/User";
import { useEffect, useState } from "react"

export const useOTPSetup = () => {
    const [secret, setSecret] = useState({
        otpauth_url: "",
        base32: ""
    })
    const [userId, setUserId] = useState("");

    const generateQrCode = async ({ user_id, email }: GenerateQrCodeParams): Promise<void> => {
        try {
            const response = await authApi.post<OtpResponse>("/auth/otp/generate", { user_id, email })

            if (response.status === 200) {
                setSecret({
                    base32: response.data.base32_secret,
                    otpauth_url: response.data.otp_auth_url,
                });
            }
        } catch (error) {
            console.error("QR Code Generation Failed:", error);
        }
    }

    const getUserFromLocalStorage = (): User | null => {
        const userString = localStorage.getItem("user");
        return userString ? JSON.parse(userString) : null;
    };

    useEffect(() => {
        const user = getUserFromLocalStorage();
        if (user) {
            const { _id: user_id, email } = user;
            setUserId(user_id);
            generateQrCode({ user_id, email });
        }
    }, []);

    return { secret, userId };
}
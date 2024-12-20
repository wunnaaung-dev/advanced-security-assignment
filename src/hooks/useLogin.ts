import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authAPI"

interface LoginResponse {
  user_id: string;
}

export const useLogin = () => {
  const [stage, setStage] = useState<'credentials' | 'otp'>('credentials');
  const [userId, setUserId] = useState<string | null>(null);
  const [loginAttemptCount, setLoginAttemptCount] = useState<number>(3);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);
  
  const navigate = useNavigate();

  const handleCredentialsSubmit = async (data: { email: string; password: string }) => {
    setErrorMessage(null);

    try {
      const response = await authApi.post<LoginResponse>('/auth/login', data);
      setUserId(response.data.user_id);
      setStage('otp');
    } catch (error: any) {
      const message = error.response?.data?.message || "An error occurred during login";
      setErrorMessage(message);
      setLoginAttemptCount(prev => prev - 1);

      if (loginAttemptCount <= 1) {
        setButtonDisabled(true);
      }
    }
  };

  const handleOTPSubmit = async (data: { otp?: string }) => {
    if (!userId) {
      setErrorMessage("User ID is missing");
      return;
    }

    try {
      const response = await authApi.post('/auth/otp/verify', {
        user_id: userId,
        token: data.otp,
      });

      if (response.data.status === "success") {
        navigate("/profile");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "OTP verification failed";
      setErrorMessage(message);
    }
  };

  const resetLoginState = () => {
    setButtonDisabled(false);
    setLoginAttemptCount(3);
  };

  return {
    stage,
    loginAttemptCount,
    errorMessage,
    isButtonDisabled,
    handleCredentialsSubmit,
    handleOTPSubmit,
    resetLoginState,
  };
};

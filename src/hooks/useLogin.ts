import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authAPI";
import { useUser } from "./useUser";

interface LoginResponse {
  user_id: string;
  userName: string;
  email: string;
  isEmailVerified: boolean;
}

export const useLogin = () => {
  const [stage, setStage] = useState<'credentials' | 'otp'>('credentials');
  const [loginAttemptsLeft, setLoginAttemptsLeft] = useState<number>(3);
  const [error, setError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const { currentUser, updateUser } = useUser();
  const navigate = useNavigate();

  const handleCredentialsSubmit = async (data: { email: string; password: string }) => {
    setError(null);

    try {
      const response = await authApi.post<LoginResponse>('/auth/login', data);
      const user = {
        _id: response.data.user_id,
        username: response.data.userName,
        email: response.data.email,
        isEmailVerified: response.data.isEmailVerified,
      };

      updateUser(user); 
      setStage('otp'); 
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during login");
      setLoginAttemptsLeft((prev) => prev - 1);

      if (loginAttemptsLeft <= 1) {
        setIsButtonDisabled(true);
      }
    }
  };
  
  const handleOTPSubmit = async (data: { otp: string }) => {
    if (!currentUser?._id) {
      setError("User ID is missing");
      return;
    }

    try {
      const response = await authApi.post('/auth/otp/verify', {
        user_id: currentUser._id,
        token: data.otp,
      });

      if (response.data.status === "success") {
        navigate("/profile");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "OTP verification failed");
    }
  };

  // Reset login state
  const resetLoginState = () => {
    setStage('credentials');
    setLoginAttemptsLeft(3);
    setError(null);
    setIsButtonDisabled(false);
  };

  return {
    stage,
    loginAttemptsLeft,
    error,
    isButtonDisabled,
    handleCredentialsSubmit,
    handleOTPSubmit,
    resetLoginState,
  };
};

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CheckTrigger from "../CheckedTrigger/CheckTrigger";
import AlertBox from "../Alert/AlertBox";
import { authApi } from '../../api/authAPI'
import { useNavigate } from "react-router-dom";
import { User } from "@/types/User";



interface LoginResponse {
    user_id: string;
}

const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [otpToken, setOtpToken] = useState<string>('');
    const [stage, setStage] = useState<'credentials' | 'otp'>('credentials');
    const [userId, setUserId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isButtonDisable, setButtonDisable] = useState<boolean>(true);

    const navigate = useNavigate();
    console.log("User Id after first login", userId)
    console.log("OTP Token", otpToken)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        switch (id) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "otp":
                setOtpToken(value);
                break;
        }
    };

    const handleCredentialsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            const response = await authApi.post<LoginResponse>('/auth/login', {
                email,
                password
            });
            console.log("Credential Response", response.data)
            setUserId(response.data.user_id);
            setStage('otp');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message
                || "An error occurred during login";
            setErrorMessage(errorMessage);
        }
    };

    const handleOTPSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            setErrorMessage("User ID is missing");
            return;
        }

        try {
            const otpResponse = await authApi.post('/auth/otp/verify', {
                user_id: userId,
                token: otpToken
            });

            if (otpResponse.data.status === "success") {
                navigate("/profile");
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message
                || "OTP verification failed";
            setErrorMessage(errorMessage);
        }
    };

    function handleButtonDisable() {
        setButtonDisable(false);
    }

    if (stage === 'otp') {
        return (
            <form onSubmit={handleOTPSubmit} className="space-y-4">
                {errorMessage && (
                    <AlertBox
                        remainingCount={3}
                        message={errorMessage}
                    />
                )}
                <div className="space-y-1">
                    <Label htmlFor="otp">Enter 6-digit OTP</Label>
                    <Input
                        id="otp"
                        value={otpToken}
                        onChange={handleInputChange}
                        maxLength={6}
                        placeholder="Enter OTP"
                    />
                </div>
                <Button type="submit">Verify OTP</Button>
            </form>
        );
    }

    
    return (
        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            {errorMessage && (
                <AlertBox
                    remainingCount={3}
                    message={errorMessage}
                />
            )}
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    value={email}
                    onChange={handleInputChange}
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mt-4 space-y-3">
                <CheckTrigger onSuccess={handleButtonDisable} />
                <Button type="submit" disabled={isButtonDisable}>
                    Login
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
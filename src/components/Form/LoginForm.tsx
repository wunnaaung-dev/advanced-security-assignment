import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CheckTrigger from "../CheckedTrigger/CheckTrigger";
import AlertBox from "../Alert/AlertBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const LoginForm = () => {
    const [isButtonDisable, setButtonDisable] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginAttemptCount, setLoginAttemptCount] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    function handleButtonDisable() {
        setButtonDisable(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === "email") setEmail(value);
        if (id === "password") setPassword(value);
    };

    interface User {
        userName: string;
        email: string;
    }

    interface Response {
        user: User;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoginAttemptCount(prev => prev + 1);

        try {
            const response = await api.post<Response>('/auth/login', { email, password });
            const currentUser = response.data.user;
            console.log("Login successful", currentUser);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            navigate("/home");
        } catch (error) {
            const errorMessage = error.response?.data?.message 
                ? error.response.data.message 
                : "An error occurred during login";
            setErrorMessage(errorMessage);

            if (loginAttemptCount >= 2) {
                setButtonDisable(true);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {loginAttemptCount > 0 && (
                <AlertBox remainingCount={3 - loginAttemptCount} message={errorMessage!} />
            )}
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={handleInputChange} />
            </div>
            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={handleInputChange} />
            </div>
            <div className="mt-4 space-y-3">
                <CheckTrigger onSuccess={handleButtonDisable} />
                <Button type="submit" disabled={isButtonDisable}>Login</Button>
            </div>
        </form>
    );
};

export default LoginForm;

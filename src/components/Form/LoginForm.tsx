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
    const navigate = useNavigate()
    function handleButtonDisable() {
        setButtonDisable(false);
    }

    // Enable the login button when both email and password fields are filled
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === "email") setEmail(value);
        if (id === "password") setPassword(value);

        setButtonDisable(!(email && password));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            console.log("Login successful", response.data);
            navigate("/home")
        } catch (error) {
            setLoginAttemptCount(prev => prev + 1);
            setErrorMessage(error.response?.data?.message || "An error occurred during login");

            if (loginAttemptCount >= 2) {
                setButtonDisable(true); // Optionally disable the button after 3 attempts
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

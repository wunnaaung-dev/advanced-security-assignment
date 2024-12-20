import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CheckTrigger from "../CheckedTrigger/CheckTrigger";
import AlertBox from "../Alert/AlertBox";
import { useLogin } from "../../hooks/useLogin";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    otp: z.string().optional(),
});

const LoginForm = () => {
    const {
        stage,
        loginAttemptCount,
        errorMessage,
        isButtonDisabled,
        handleCredentialsSubmit,
        handleOTPSubmit,
        resetLoginState,
    } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "", otp: "" },
    });

    return (
        <Form {...form}>
            {errorMessage && loginAttemptCount <= 1 && (
                <AlertBox
                    remainingCount={loginAttemptCount}
                    message={errorMessage}
                    setButtonEnable={resetLoginState}
                />
            )}

            {stage === "credentials" && (
                <form onSubmit={form.handleSubmit(handleCredentialsSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-4 space-y-3">
                        <CheckTrigger onSuccess={resetLoginState} />
                        <Button type="submit" disabled={isButtonDisabled}>
                            Login
                        </Button>
                    </div>
                </form>
            )}

            {stage === "otp" && (
                <form onSubmit={form.handleSubmit(handleOTPSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter 6-digit OTP</FormLabel>
                                <FormControl>
                                    <Input maxLength={6} placeholder="Enter OTP" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Verify OTP</Button>
                </form>
            )}
        </Form>
    );
};

export default LoginForm;

import { authApi } from "@/api/authAPI"
import { User } from "@/types/User"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    retypePassword: z.string().min(8, {
        message: "Retyped password must be at least 8 characters.",
    }),
}).refine((data) => data.password === data.retypePassword, {
    message: "Passwords do not match",
    path: ["retypePassword"],
})

export const useRegisterForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            retypePassword: "",
        }
    })

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleButtonEnable = () => setIsButtonDisabled(false);

    const registerUser = async (values: z.infer<typeof formSchema>) => {
        try {
            setError(null);
            const response = await authApi.post<{ user: User }>("/auth/register", {
                username: values.username,
                email: values.email,
                password: values.password,
            });

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                form.reset();
                navigate("/otp-setup");
            }
        } catch (err) {
            const errorMessage = (err as any)?.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMessage);
        }
    };

    return {
        form,
        error,
        isButtonDisabled,
        handleButtonEnable,
        registerUser,
    };

}

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import PasswordStatusBar from "../PasswordStrength/PasswordStatusBar"
import { authApi } from "../../api/authAPI"
import CheckTrigger from "../CheckedTrigger/CheckTrigger"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User } from "@/types/User"

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



const RegisterForm = () => {
    const [isButtonDisable, setButtonDisable] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "Cho Thar Yin Kyay Wunna Lay",
            email: "youremail@gmail.com",
            password: "1234",
            retypePassword: "1234"
        },
    })



    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setError(null)
            const response = await authApi.post<{user: User}>("/auth/register", {
                username: values.username,
                email: values.email,
                password: values.password
            })

            if (response.status === 200) {

                localStorage.setItem("user", JSON.stringify(response.data.user))
                form.reset()
                navigate("/otp-setup")
            }
        } catch (error: any) {
            console.error("Registration error:", error)
            setError(error.response?.data?.message || "Registration failed. Please try again.")
        }
    }

    function handleButtonDisable() {
        setButtonDisable(false)
    }

    const password: string = form.watch("password")
    const retypePassword: string = form.watch("retypePassword")

    return (
        <Form {...form}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-5 w-full items-start rounded-2xl px-14 py-6 shadow-lg">
                <div className="w-[60%]">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email address" {...field} />
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
                                    <Input type="password" placeholder="Type your password here" {...field} />
                                </FormControl>
                                <FormMessage />
                                {password && <PasswordStatusBar currentPwd={password} />}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="retypePassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Re-type Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Re-type your password here" {...field} />
                                </FormControl>
                                <FormMessage />
                                {retypePassword && <PasswordStatusBar currentPwd={retypePassword} />}
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-[40%] space-y-3 mt-10">
                    
                    <CheckTrigger onSuccess={handleButtonDisable} />
                    <Button disabled={isButtonDisable} className="mt-4" type="submit">Register</Button>
                </div>
            </form>
        </Form>
    )
}

export default RegisterForm
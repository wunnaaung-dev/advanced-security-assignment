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
import axios from "axios"
import CheckTrigger from "../CheckedTrigger/CheckTrigger"
import { useState } from "react"


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
            console.log("username", values.username)
            const response = await axios.post("http://localhost:8000/api/auth/register", {
                username: values.username,
                email: values.email,
                password: values.password
            })
            if (response.status === 200) {
                document.cookie = `accessToken=${response.data.accessToken}; path=/`;
                alert(response.data.message)
                form.reset()
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleButtonDisable() {
        setButtonDisable(false)
    }

    const password: string = form.watch("password")
    const retypePassword: string = form.watch("retypePassword")
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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

                <CheckTrigger onSuccess={handleButtonDisable} />

                <Button disabled={isButtonDisable} className="mt-4" type="submit">Register</Button>
            </form>
        </Form>
    )
}

export default RegisterForm
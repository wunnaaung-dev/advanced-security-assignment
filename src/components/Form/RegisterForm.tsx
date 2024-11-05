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

import CheckTrigger from "../CheckedTrigger/CheckTrigger"
import React, { useState } from "react"


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password blah blah",
    }),
    retypePassword: z.string().min(2, {
        message: "Re type Password blah blah",
    }),
})

const RegisterForm = () => {
    const [isButtonDisable, setButtonDisable] = useState<boolean>(true)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "Cho Thar Yin Kyay Wunna Lay",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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

                <CheckTrigger onSuccess={handleButtonDisable}/>

                <Button disabled={isButtonDisable} className="mt-4" type="submit">Register</Button>
            </form>
        </Form>
    )
}

export default RegisterForm
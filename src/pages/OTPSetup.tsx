import { authApi } from "@/api/authAPI"
import TwoFactorAuth from "@/components/TwoFactorAuth/TwoFactorAuth"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { User } from "@/types/User"
import { useEffect, useState } from "react"
const OTPSetup = () => {

    const [secret, setSecret] = useState({
        otpauth_url: "",
        base32: ""
    })

    const [userId, setUserId] = useState("")
    const generateQrCode = async ({
        user_id,
        email,
    }: {
        user_id: string,
        email: string
    }) => {
        const response = await authApi.post<{
            otp_auth_url: string;
            base32_secret: string
        }>("auth/otp/generate", {user_id, email})

        if(response.status === 200) {
            setSecret({
                base32: response.data.base32_secret,
                otpauth_url: response.data.otp_auth_url
            })
        }
    }

    const getUserFromLocalStorage = (): User => {
        const userString = localStorage.getItem('user')
        return userString ? JSON.parse(userString) : null
    }

    useEffect(() => {
        const user : User = getUserFromLocalStorage()
        const user_id = user._id
        const email = user.email
        console.log(user_id, email)
        setUserId(user_id)
        generateQrCode({user_id, email})
    }, [])

    return (
        <div className="bg-white rounded-lg mx-auto mt-4 shadow-xl w-2/4 py-4">
            <h2 className="text-center font-bold text-2xl underline underline-offset-8">Setup for 2 Factor Authentication</h2>
            <section className="px-8 mt-16">
                <ul>
                    <li className="font-semibold">Go to your email and verify your account first</li>
                    <li className="mt-4">
                        <Dialog>
                            <DialogTrigger className="text-blue-500 underline underline-offset-4 cursor-pointer">
                                <button className="bg-blue-500 rounded-md py-2 px-14 text-white">
                                    Setup for 2 FA
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader className="font-bold text-lg">Two-Factor Authentication (2FA)</DialogHeader>
                                <Separator />
                                <TwoFactorAuth otpauth_url={secret.otpauth_url} base32={secret.base32} user_id={userId}/>
                            </DialogContent>
                        </Dialog>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default OTPSetup
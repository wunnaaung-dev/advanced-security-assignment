import TwoFactorAuth from "@/components/TwoFactorAuth/TwoFactorAuth"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useOTPSetup } from "@/hooks/useOTPSetup"

const OTPSetup = () => {

   const { secret, userId } = useOTPSetup();

    return (
        <div className="bg-white rounded-lg mx-auto mt-4 shadow-xl w-2/4 py-4">
            <h2 className="text-center font-bold text-2xl underline underline-offset-8">Setup for 2 Factor Authentication</h2>
            <section className="px-8 mt-16">
                <ul>
                    <li className="font-semibold">Go to your email and verify your account first</li>
                    <li className="mt-4">
                        <Dialog>
                            <DialogTrigger asChild>
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
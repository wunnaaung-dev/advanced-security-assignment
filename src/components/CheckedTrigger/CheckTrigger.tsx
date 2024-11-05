import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ImageCaptcha from "../ImageCaptcha/ImageCaptcha";
import { Check } from 'lucide-react';
type TriggerState = "close" | "pending" | "open" | "success";

interface CheckTriggerProps {
    onSuccess: () => void
}

const CheckTrigger: React.FC<CheckTriggerProps> = ({onSuccess}) => {
    const [trigger, setTrigger] = useState<TriggerState>("close");

    const handleTrigger = (): void => {
        setTrigger("pending");
        setTimeout(() => setTrigger("open"), 2000);
    };

    const handleCaptchaSuccess = () => {
        setTrigger("success");
        onSuccess()
    };

    let triggerElement: JSX.Element | null = null;

    if (trigger === "close") {
        triggerElement = (
            <div
                onClick={handleTrigger}
                className="w-8 h-8 bg-slate-200 cursor-pointer"
            />
        );
    } else if (trigger === "pending") {
        triggerElement = (
            <div
                className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
            />
        );
    } else if (trigger === "success") {
        triggerElement = (
            <div className="w-8 h-8 bg-slate-200 flex justify-center items-center">
                <Check className="text-green-600"/>
            </div>
            
        )
    }

    return (
        <Popover>
            <div className="relative border border-gray-200 rounded-lg p-3 mt-3">
                <section className="flex justify-between items-center gap-5">
                    <div className="flex gap-4 items-center">
                        <PopoverTrigger >
                            {triggerElement}
                        </PopoverTrigger>
                        <p>I'm not a robot</p>
                    </div>
                    <img 
                        className="w-12" 
                        src="/src/assets/captcha/RecaptchaLogo.png" 
                        alt="reCAPTCHA logo" 
                    />
                </section>
                {trigger === "open" && (
                    <PopoverContent className="w-80">
                        <ImageCaptcha onSuccess={handleCaptchaSuccess}/>
                    </PopoverContent>
                )}
            </div>
        </Popover>
    );
};

export default CheckTrigger;
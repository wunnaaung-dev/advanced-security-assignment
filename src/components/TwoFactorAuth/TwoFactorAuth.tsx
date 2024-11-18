import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import QRCode from "qrcode";
import { authApi } from "../../api/authAPI"
import { useNavigate } from "react-router-dom";

type TwoFactorAuthProps = {
  otpauth_url: string;
  base32: string;
  user_id: string;
};

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  otpauth_url,
  base32,
  user_id,
}) => {
  const [qrcodeUrl, setQrCodeUrl] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (otpauth_url) {
      QRCode.toDataURL(otpauth_url)
        .then(setQrCodeUrl)
        .catch((err) => console.error("QR Code generation failed:", err));
    }
  }, [otpauth_url]);

  const handleVerifyCode = async () => {
    setError(null);
    
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a 6-digit verification code");
      return;
    }

    try {
      setIsVerifying(true);
      
      const response = await authApi.post('/auth/otp/verify', {
        user_id,
        token: verificationCode
      });

      if (response.data.status === "success") {
        alert("Two-factor authentication setup successful!");
        navigate("/login")
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "Verification failed");
      } else if (err.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div>
      <h4 className="text-blue-600">Configuring Google Authenticator or Authy</h4>
      <div className="text-justify">
        <ul>
          <li>Install Google Authenticator (iOS - Android) or Authy (iOS - Android).</li>
          <li>In the authenticator app, select the "+" icon.</li>
          <li>Use the "Scan a barcode (or QR code)" option to scan the QR code below.</li>
        </ul>
      </div>
      <Separator className="my-2" />

      <div>
        <h4 className="text-blue-600">Scan QR Code</h4>
        <div className="flex justify-center">
          {qrcodeUrl ? (
            <img
              className="block w-52 h-52 object-contain"
              src={qrcodeUrl}
              alt="QR code for two-factor authentication setup"
            />
          ) : (
            <p>Loading QR Code...</p>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-blue-600">Or Enter Code Into Your App</h4>
        <Separator />
        <p className="text-sm">Secret Key: <span className="font-mono">{base32}</span> (Base32 encoded)</p>
      </div>

      <div>
        <h4 className="text-blue-600">Verify Code</h4>
        <p className="text-sm">
          To complete the setup, please verify the generated authentication code in the app.
        </p>
        {error && (
          <div className="text-red-500 mt-2 text-sm">
            {error}
          </div>
        )}
        <div className="mt-4">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter 6-digit verification code"
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            maxLength={6}
          />
          <button
            onClick={handleVerifyCode}
            disabled={isVerifying}
            className={`mt-3 text-white px-4 py-2 rounded-md ${
              isVerifying 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isVerifying ? "Verifying..." : "Verify Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
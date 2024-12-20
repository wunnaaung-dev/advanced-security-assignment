import { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AlertProps = {
  remainingCount: number;
  message?: string;
  setButtonEnable: () => void;
};

const AlertBox = ({ remainingCount, message, setButtonEnable }: AlertProps) => {
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (remainingCount <= 1) {
      setShowTimer(true);
      setTimeLeft(60);

      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timer) clearInterval(timer);
            setShowTimer(false);
            setButtonEnable();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [remainingCount, setButtonEnable]);

  return (
    <Alert>
      <div className="flex items-center gap-2 text-red-500">
        <CircleAlert />
        <AlertTitle>{message}</AlertTitle>
      </div>
      <AlertDescription className="text-slate-500">
        {remainingCount > 0 ? (
          <>You only have remaining {remainingCount} attempts.</>
        ) : (
          <>
            You only have remaining {remainingCount} attempt. <br />
            {showTimer && <span>Try again in {timeLeft} seconds.</span>}
          </>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default AlertBox;

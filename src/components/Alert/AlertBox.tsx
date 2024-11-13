import { CircleAlert } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type AlertProps = {
  remainingCount?: number,
  message?: string
}

const AlertBox = ({ remainingCount, message }: AlertProps) => {
  return (
    <Alert>
      <div className="flex items-center gap-2 text-red-500">
        <CircleAlert />
        <AlertTitle>Login-in Attempt Failed!</AlertTitle>
      </div>
      <AlertDescription className="text-slate-500">
        {message ? message : `You only have remaining ${remainingCount}`}
      </AlertDescription>
    </Alert>
  )
}

export default AlertBox
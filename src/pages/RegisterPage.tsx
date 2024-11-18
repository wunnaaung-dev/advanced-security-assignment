
import { Outlet } from "react-router-dom"

const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen py-9 px-6">
        <h1 className="text-center text-[#3C552D] uppercase font-bold text-4xl underline">Lock in Your Spot - Safe and Secure </h1>
        <p className="text-center text-[#E6C767] font-semibold mt-2 text-2xl">Join Brilliant Portal Today!</p>
        <Outlet />
    </div>
  )
}

export default RegisterPage
import LoginForm from "@/components/Form/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

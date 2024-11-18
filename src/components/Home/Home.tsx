import { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
}

const Home = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">
          Welcome to the <span className="font-bold text-blue-500">Fucking Conference Portal</span>!
        </h1>

        {user ? (
          <div className="mb-8 text-start">
            <p className="text-lg font-semibold text-gray-800">
              <span className="font-bold">User ID:</span> {user._id}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              <span className="font-bold">Username:</span> {user.username}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              <span className="font-bold">Email:</span> {user.email}
            </p>
          </div>
        ) : (
          <p className="text-gray-600 mb-8">User information not available.</p>
        )}
        <h1 className="my-3 font-semibold text-amber-900 text-2xl">By Order of Peaky Fucking Blinders</h1>
        {/* Conference Entry Card */}
        <div
          className="bg-blue-50 p-6 rounded-lg shadow-md hover:bg-blue-100 transition duration-200 cursor-pointer"
          onClick={() => alert("Joining the demo conference room!")}
        >
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Enter Conference</h2>
          <p className="text-gray-700">Click here to join the demo conference room.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

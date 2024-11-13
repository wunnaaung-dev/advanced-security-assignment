import React, { useEffect, useState } from 'react';

interface User {
  userName: string;
  email: string;
}

const Home = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve user data from localStorage and parse it
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Welcome to the <span className='font-bold text-red-500'>Fucking</span> Conference Portal!</h1>
        
        {user ? (
          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-800">Username: {user.userName}</p>
            <p className="text-lg font-semibold text-gray-800">Email: {user.email}</p>
          </div>
        ) : (
          <p className="text-gray-600 mb-8">User information not available.</p>
        )}

        {/* Conference Entry Card */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:bg-blue-100 transition duration-200 cursor-pointer">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Enter Conference</h2>
          <p className="text-gray-700">Click here to join the demo conference room.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

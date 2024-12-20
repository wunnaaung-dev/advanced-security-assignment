import { useUser } from '@/hooks/useUser'

const Home = () => {
  const { currentUser } = useUser();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">
          Welcome to the <span className="font-bold text-blue-500">Conference Portal</span>!
        </h1>

        {currentUser ? (
          <div className="mb-8 text-start">
            <p className="text-lg font-semibold text-gray-800">
              <span className="font-bold">User ID:</span> {currentUser._id}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              <span className="font-bold">Username:</span> {currentUser.username}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              <span className="font-bold">Email:</span> {currentUser.email}
            </p>
          </div>
        ) : (
          <p className="text-gray-600 mb-8">User information not available.</p>
        )}
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

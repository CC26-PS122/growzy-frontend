import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Profile() {
  const navigate = useNavigate();

  const user = {
    username: "Username",
    email: "youremail@gmail.com",
    sleepGoal: 8,
    waterGoal: 3000,
  };

  return (
    <div className="min-h-screen bg-[#AFC8D6] flex justify-center items-center px-4 md:py-10">

      <div className="w-full max-w-5xl">

        {/* 📱 NAVBAR (MOBILE ONLY) */}
        <div className="block md:hidden mb-4">
          <Navbar />
        </div>

        {/* 💻 HEADER (DESKTOP ONLY) */}
        <div className="hidden md:flex items-center gap-2 mb-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-[#0F3D5E] hover:underline"
          >
            ← Back to Dashboard
          </button>

          <span className="text-gray-400">|</span>

          <h1 className="text-xl font-semibold text-gray-700">
            Profile
          </h1>

        </div>

        {/* 📱 TITLE (MOBILE ONLY) */}
        <h1 className="md:hidden text-lg font-semibold text-gray-700 mb-4">
          Profile
        </h1>

        {/* AVATAR */}
        <div className="mb-6 flex justify-center md:justify-start">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-full shadow-sm"></div>
        </div>

        {/* USER INFO CARD */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 md:p-6 shadow-sm mb-6">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-1">
            <p className="text-gray-400 text-sm">Username</p>
            <p className="text-gray-600 border-b border-gray-300 md:w-1/2 md:text-right">
              {user.username}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-gray-600 md:w-1/2 md:text-right break-all">
              {user.email}
            </p>
          </div>

        </div>

        {/* GOALS CARD */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 md:p-6 shadow-sm mb-8">

          <h2 className="text-center text-gray-500 mb-4 text-sm md:text-base">
            Your Goals
          </h2>

          <div className="flex justify-between items-center border-t pt-4 mb-3 text-sm md:text-base">
            <p className="text-gray-400">Sleep Goal</p>
            <p className="text-gray-600">
              {user.sleepGoal || "__"} hours
            </p>
          </div>

          <div className="flex justify-between items-center border-t pt-3 text-sm md:text-base">
            <p className="text-gray-400">Drink Goal</p>
            <p className="text-gray-600">
              {user.waterGoal || "__"} ml
            </p>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex flex-col items-center gap-2">

          <button className="bg-[#0F3D5E] text-white px-6 py-2 rounded-full text-sm shadow w-full md:w-auto">
            Edit profile
          </button>

          <button
            onClick={() => navigate("/login")}
            className="text-gray-500 text-sm"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Profile;
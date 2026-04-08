import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  
  const user = {
    username: "Username",
    email: "youremail@gmail.com",
    sleepGoal: 8,
    waterGoal: 3000,
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">

      
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-yellow-200 rounded-full"></div>
      </div>

      
      <div className="bg-white rounded-xl p-4 shadow mb-6">
        <div className="flex justify-between mb-2">
          <p className="text-gray-500">Username</p>
          <p className="font-semibold">{user.username}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500">Email</p>
          <p className="font-semibold">{user.email}</p>
        </div>
      </div>

      
      <div className="bg-white rounded-xl p-4 shadow mb-6">
        <h2 className="text-center font-semibold mb-4">Your Goals</h2>

        <div className="flex justify-between mb-2">
          <p className="text-gray-500">Sleep Goal</p>
          <p>{user.sleepGoal} hours</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-500">Drink Goal</p>
          <p>{user.waterGoal} ml</p>
        </div>
      </div>

      
      <div className="flex flex-col items-center gap-2">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full">
          Edit profile
        </button>

        <button
          onClick={() => navigate("/login")}
          className="text-gray-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
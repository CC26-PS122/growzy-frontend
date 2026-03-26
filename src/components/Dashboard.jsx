import SleepTracker from "./sleepTracker";
import WaterTracker from "./WaterTracker";
import MoodTracker from "./MoodTracker";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-3xl font-bold mb-6">Dashboard 🏠</h1>

      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SleepTracker />
        <WaterTracker />
        <MoodTracker />
      </div>
    </div>
  );
}

export default Dashboard;
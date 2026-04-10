import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import { fetchWithAuth } from "../utils/api";

import SleepTracker from './SleepTracker';
import WaterTracker from './WaterTracker';
import MoodTracker from './MoodTracker';

const Dashboard = () => {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [todayLog, setTodayLog] = useState(null);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const toggleDropdown = (trackerId) => {
    setActiveDropdown(activeDropdown === trackerId ? null : trackerId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetchWithAuth("/auth/user");
        setUser(userRes.data);

        const profileRes = await fetchWithAuth("/auth/profile");
        setProfile(profileRes.data);

        const logRes = await fetchWithAuth("/auth/daily-logs");
        setTodayLog(logRes.data[0]); // ambil paling baru
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#D2EEFF] min-h-screen flex items-start md:items-center justify-center pt-6 md:pt-0">

      <div className="max-w-7xl w-full px-4 py-6 md:py-0">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          {/* LEFT SIDE */}
          <div className="flex flex-col h-full">

            {/* HELLO TEXT */}
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Hello, {user?.username || "User"}!
            </h1>

            {/* CARD */}
            <div className="rounded-xl p-8 shadow-sm bg-white/50 flex-1">
              <div className="flex flex-col items-center mb-4">
                <p className="text-gray-600 mb-2">Date</p>
                <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center mb-2">
                  <span className="text-white text-lg">Icon</span>
                </div>
                <p className="font-medium text-gray-800 mb-4">Text</p>
                <hr className="w-full border-gray-200 mb-4" />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sleep time</span>
                  <span>{todayLog?.total_sleep_minutes ? `${Math.floor(todayLog.total_sleep_minutes / 60)} hours` : "__ hours"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Water intake</span>
                  <span>{todayLog?.total_water_ml || "__"} mL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mood</span>
                  <span>{todayLog?.mood_types?.mood_name || "__ mood"}</span>
                </div>
              </div>
            </div>

          </div>

          <div className="md:col-span-2 space-y-6">

            <Navbar />

            <div className="bg-white/50 rounded-xl p-4 px-10 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Weekly Habit Progress
              </h2>

              <div className="flex justify-between mb-4">
                {weekDays.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-300 mb-1"></div>
                    <span className="text-xs text-gray-500">{day}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button className="bg-[#004A78] text-white px-4 py-1 rounded-full text-sm shadow-sm">
                  View Monthly
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Track your habit today.
              </h2>

              <div className="space-y-1">
                <SleepTracker
                  isActive={activeDropdown === 1}
                  onToggle={() => toggleDropdown(1)}
                />

                <WaterTracker
                  isActive={activeDropdown === 2}
                  onToggle={() => toggleDropdown(2)}
                />

                <MoodTracker
                  isActive={activeDropdown === 3}
                  onToggle={() => toggleDropdown(3)}
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
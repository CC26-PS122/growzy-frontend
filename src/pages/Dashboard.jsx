import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils/api";

import SleepTracker from '../features/tracker/SleepTracker';
import WaterTracker from '../features/tracker/WaterTracker';
import MoodTracker from '../features/tracker/MoodTracker';

// --- KOMPONEN LOADING POPUP ---
const LoadingPopup = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-md">
    <div className="bg-white/90 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-5 border border-white">

      {/* ICON MUTER-MUTER */}
      <div className="relative w-20 h-20">
        <img
          src="/images/char_happy.svg"
          alt="Loading..."
          className="w-full h-full animate-spin"
          style={{ animationDuration: '3s' }} // Biar muternya elegan, nggak bikin pusing
        />
      </div>

      {/* TEXT MENARIK */}
      <div className="text-center">
        <h3 className="text-[#004A78] font-bold text-lg">Hang tight!</h3>
        <p className="text-gray-500 text-sm font-medium animate-pulse">
          Moody is syncing your data...
        </p>
      </div>

    </div>
  </div>
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [todayLog, setTodayLog] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 🔥 State Loading awal true
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigate = useNavigate();
  const today = new Date();

  const formattedToday = today.toLocaleDateString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const toggleDropdown = (trackerId) => {
    setActiveDropdown(activeDropdown === trackerId ? null : trackerId);
  };

  const fetchData = async () => {
    setIsLoading(true); // 🔥 Set loading tiap kali fetch (misal saat onSaved)
    try {
      const userRes = await fetchWithAuth("/auth/user");
      setUser(userRes.data);

      const logRes = await fetchWithAuth("/auth/daily-logs");

      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      setLogs(logRes.data);

      const todayData = logRes.data.find(
        (log) => log.log_date === todayStr
      );

      setTodayLog(todayData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false); // 🔥 Matikan loading apapun hasilnya
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const formatted = `${d.getFullYear()}-${String(
        d.getMonth() + 1
      ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      days.push({
        date: formatted,
        label: d.toLocaleDateString("default", { weekday: "short" }).charAt(0),
      });
    }
    return days;
  };

  const isDayComplete = (dateStr) => {
    const log = logs.find((l) => l.log_date === dateStr);
    if (!log) return false;
    return (
      log.total_sleep_minutes &&
      log.total_water_ml &&
      log.mood_types
    );
  };

  const capitalize = (text) => {
    if (!text) return "__";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const moodIcon =
    todayLog?.mood_types?.default_expression_asset
      ? todayLog.mood_types.default_expression_asset.replace("public/", "")
      : "images/sleepy_char.svg";

  const moodText = todayLog?.mood_types?.mood_name
    ? `You're feeling ${capitalize(todayLog.mood_types.mood_name)} today`
    : "No mood recorded today";

  return (
    <div className="bg-[#D2EEFF] min-h-screen flex items-start md:items-center justify-center pb-20 md:pt-6">

      {/* 🔥 TAMPILKAN POPUP JIKA ISLOADING TRUE */}
      {isLoading && <LoadingPopup />}

      <div className="max-w-7xl w-full px-4 py-6 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          {/* LEFT SIDE */}
          <div className="flex flex-col h-fit">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Hello, {user?.username || "User"}!
            </h1>

            <div className="rounded-xl p-8 shadow-sm bg-white/50 flex-1">
              <div className="flex flex-col items-center mb-4">
                <p className="font-medium text-gray-800 mb-4">
                  {formattedToday}
                </p>
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-2 overflow-hidden">
                  <img
                    src={`/${moodIcon}`}
                    onError={(e) => {
                      e.target.src = "/images/sleepy_char.svg";
                    }}
                    className="w-full h-full object-cover"
                    alt="mood"
                  />
                </div>
                <p className="font-medium text-gray-800 mb-4">
                  {moodText}
                </p>
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
                  <span>{capitalize(todayLog?.mood_types?.mood_name || "__ mood")}</span>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-gray-500">
                <p className="text-gray-600 text-sm mb-3">Note</p>
                <div className="bg-white rounded-lg min-h-[50px] max-h-full overflow-y-auto scrollbar-thin">
                  <div className="p-3 text-sm text-gray-700 min-h-[50px] max-h-[120px] md:max-h-[180px] overflow-y-auto break-words scrollbar-thin">
                    {todayLog?.mood_note ? todayLog.mood_note : "No note yet"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-2 space-y-6">
            <Navbar />

            <div className="bg-white/50 rounded-xl p-4 px-10 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Weekly Habit Progress
              </h2>

              <div className="flex justify-between mb-4">
                {getLast7Days().map((day, idx) => {
                  const isComplete = isDayComplete(day.date);
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full mb-1 transition ${isComplete ? "bg-blue-500" : "bg-gray-300"}`}
                      ></div>
                      <span className="text-xs text-gray-500">{day.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-[#004A78] text-white px-4 py-1 rounded-full text-sm shadow-sm hover:bg-[#00365a] transition"
                  onClick={() => navigate("/calendar")}
                >
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
                  onSaved={fetchData}
                />

                <WaterTracker
                  isActive={activeDropdown === 2}
                  onToggle={() => toggleDropdown(2)}
                  onSaved={fetchData}
                />

                <MoodTracker
                  isActive={activeDropdown === 3}
                  onToggle={() => toggleDropdown(3)}
                  onSaved={fetchData}
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
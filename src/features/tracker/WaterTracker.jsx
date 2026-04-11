import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../utils/api";

function WaterTracker({ onSaved }) {
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [target, setTarget] = useState(2000);
  const isFull = total >= target;

  // const target = 2000; // ml (bisa lo ubah)

  const options = [100, 200, 500];

  const handleAddWater = (amount) => {
    setTotal((prev) => Math.min(prev + amount, target));
  };

  const progress = target ? (total / target) * 100 : 0;

  const handleSaveWater = async () => {
    try {
      await fetchWithAuth("/auth/daily-logs", {
        method: "PUT",
        body: JSON.stringify({
          total_water_ml: total, // 🔥 FIX (bukan "amount")
        }),
      });

      // 🔥 trigger dashboard update
      onSaved && onSaved();

      alert("Water saved!");
      // console.log("TOTAL YANG DIKIRIM:", total);
    } catch (err) {
      console.error(err);
      alert("Failed save water");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await fetchWithAuth("/auth/profile");
        setTarget(profileRes.data.daily_water_target);

        const logRes = await fetchWithAuth("/auth/daily-logs");

        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        const todayLog = logRes.data.find(
          (log) => log.log_date === todayStr
        );

        if (todayLog?.total_water_ml) {
          setTotal(todayLog.total_water_ml); // 🔥 ambil dari backend
        }

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleReset = async () => {
    try {
      setTotal(0);

      await fetchWithAuth("/auth/daily-logs", {
        method: "PUT",
        body: JSON.stringify({
          total_water_ml: 0,
        }),
      });

      onSaved && onSaved(); // 🔥 biar dashboard update

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-transparent flex items-center justify-center p-2">
      <div className="w-full bg-white rounded-2xl shadow-lg p-4 md:p-5">

        {/* HEADER */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-xl">
              <img
                src="/images/watertracker.png"
                alt="water"
                className="w-4 md:w-5"
              />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-semibold">
                Drink Tracker
              </h2>
              <p className="text-xs md:text-sm text-gray-400">
                Track your daily water intake
              </p>
            </div>
          </div>

          <span className={`transition ${isOpen ? "rotate-180" : ""}`}>
            ⌄
          </span>
        </div>

        {/* CONTENT */}
        <div
          className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[500px] mt-5" : "max-h-0"
            }`}
        >

          {/* DIVIDER */}
          <div className="border-t border-blue-200 my-4 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-[1px] w-10 h-[2px] bg-blue-500 rounded-full"></div>
          </div>

          {/* PROGRESS */}
          <div className="mb-5">
            <p className="text-center text-sm md:text-base text-gray-500 mb-2">
              Progress
            </p>

            <div className="w-full h-2 md:h-3 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-[10px] md:text-xs text-gray-400 mt-1">
              <span>0 mL</span>
              <span>
                {total} mL / {target} mL
              </span>
            </div>
          </div>

          {/* OPTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 mb-5">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAddWater(opt)}
                disabled={isFull}
                className={`border rounded-full py-2 text-sm transition
                  ${isFull ? "bg-gray-200 cursor-not-allowed" : "hover:bg-blue-50"}
                `}
              >
                {opt} mL
              </button>
            ))}
          </div>

          {/* ACTION */}
          <div className="flex gap-2">

            <button
              onClick={handleSaveWater}
              className="w-full bg-blue-800 text-white p-3 rounded-full">
              Save
            </button>

            <button
              onClick={handleReset}
              className="w-full border border-red-300 text-red-500 py-2 rounded-full"
            >
              Reset
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default WaterTracker;
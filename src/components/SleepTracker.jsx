import { useState } from "react";

function SleepTracker() {
  const [sleepData, setSleepData] = useState([]);
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");
  const [isOpen, setIsOpen] = useState(false); // 🔥 dropdown

  const calculateDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);

    const diff = (endTime - startTime) / (1000 * 60 * 60);
    return diff.toFixed(1);
  };

  const handleAddSleep = () => {
    if (!sleepStart || !sleepEnd) return;

    if (new Date(sleepEnd) <= new Date(sleepStart)) {
      alert("Waktu tidak valid!");
      return;
    }

    const duration = calculateDuration(sleepStart, sleepEnd);

    const newData = {
      id: Date.now(),
      sleepStart,
      sleepEnd,
      duration,
    };

    setSleepData([newData, ...sleepData]);
    setSleepStart("");
    setSleepEnd("");
  };

  return (
    <div className="bg-white flex items-center justify-center p-4">

      {/* CARD */}
      <div className="w-full bg-white rounded-2xl shadow-lg p-5">

        {/* HEADER (CLICKABLE) */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-lg">
              🛌
            </div>
            <h2 className="text-lg font-semibold">Sleep Tracker</h2>
          </div>

          {/* ICON */}
          <span
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ⌄
          </span>
        </div>

        {/* CONTENT (DROPDOWN) */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-[600px] mt-5" : "max-h-0"
          }`}
        >

          {/* INPUT */}
          <div className="flex flex-col gap-3 mb-5">
            <input
              type="datetime-local"
              value={sleepStart}
              onChange={(e) => setSleepStart(e.target.value)}
              className="border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none p-2 rounded-lg"
            />

            <input
              type="datetime-local"
              value={sleepEnd}
              onChange={(e) => setSleepEnd(e.target.value)}
              className="border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none p-2 rounded-lg"
            />

            <button
              onClick={handleAddSleep}
              className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition"
            >
              Add Sleep
            </button>
          </div>

          {/* LIST */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {sleepData.length === 0 ? (
              <div className="text-center text-gray-400 py-6">
                Belum ada data tidur
              </div>
            ) : (
              sleepData.map((item) => (
                <div
                  key={item.id}
                  className="bg-purple-50 p-3 rounded-xl"
                >
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      {new Date(item.sleepStart).toLocaleString()}
                    </span>
                    <span>
                      {new Date(item.sleepEnd).toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-2 text-purple-700 font-semibold">
                    💤 {item.duration} jam tidur
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default SleepTracker;
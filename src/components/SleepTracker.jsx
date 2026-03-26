import { useState } from "react";

function SleepTracker() {
  const [sleepData, setSleepData] = useState([]);
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");

  const handleAddSleep = () => {
    if (!sleepStart || !sleepEnd) return;

    const newData = {
      id: Date.now(),
      sleepStart,
      sleepEnd,
    };

    setSleepData([...sleepData, newData]);
    setSleepStart("");
    setSleepEnd("");
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Sleep Tracker 🛌</h2>

      
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="datetime-local"
          value={sleepStart}
          onChange={(e) => setSleepStart(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="datetime-local"
          value={sleepEnd}
          onChange={(e) => setSleepEnd(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleAddSleep}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Sleep
        </button>
      </div>

      
      <div>
        {sleepData.length === 0 ? (
          <p className="text-gray-500">Belum ada data tidur</p>
        ) : (
          sleepData.map((item) => (
            <div
              key={item.id}
              className="border p-2 rounded mb-2 flex flex-col"
            >
              <span>Start: {item.sleepStart}</span>
              <span>End: {item.sleepEnd}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SleepTracker;
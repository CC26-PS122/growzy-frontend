import { useState } from "react";

function MoodTracker() {
  const [moodData, setMoodData] = useState([]);
  const [mood, setMood] = useState("");

  const handleAddMood = () => {
    if (!mood) return;

    const newData = {
      id: Date.now(),
      mood,
      time: new Date().toLocaleString(),
    };

    setMoodData([...moodData, newData]);
    setMood("");
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Mood Tracker 😊</h2>

      
      <div className="flex flex-col gap-2 mb-4">
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Pilih mood</option>
          <option value="Senang 😄">Senang 😄</option>
          <option value="Sedih 😢">Sedih 😢</option>
          <option value="Marah 😡">Marah 😡</option>
          <option value="Capek 😴">Capek 😴</option>
        </select>

        <button
          onClick={handleAddMood}
          className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
        >
          Add Mood
        </button>
      </div>

      
      <div>
        {moodData.length === 0 ? (
          <p className="text-gray-500">Belum ada mood</p>
        ) : (
          moodData.map((item) => (
            <div
              key={item.id}
              className="border p-2 rounded mb-2 flex justify-between"
            >
              <span>{item.mood}</span>
              <span className="text-sm text-gray-500">{item.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MoodTracker;
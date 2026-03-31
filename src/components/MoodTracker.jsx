import { useState } from "react";

function MoodTracker() {
  const [moodData, setMoodData] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [isOpen, setIsOpen] = useState(false); // 🔥 dropdown state

  const moods = [
    { label: "Happy", emoji: "😄", color: "bg-yellow-100 text-yellow-600", ringColor: "ring-yellow-600" },
    { label: "Sad", emoji: "😢", color: "bg-blue-100 text-blue-600", ringColor: "ring-blue-600" },
    { label: "Angry", emoji: "😡", color: "bg-red-100 text-red-600", ringColor: "ring-red-600" },
    { label: "Tired", emoji: "😴", color: "bg-purple-100 text-purple-600", ringColor: "ring-purple-600" },
  ];

  const handleAddMood = () => {
    if (!selectedMood) return;

    const newData = {
      id: Date.now(),
      mood: selectedMood,
      time: new Date().toLocaleTimeString(),
    };

    setMoodData([newData, ...moodData]);
    setSelectedMood("");
  };

  return (
    <div className="bg-[#EAF4F4] min-h-screen flex items-center justify-center p-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-5">

        {/* HEADER (CLICKABLE) */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 text-lg">
              😊
            </div>
            <h2 className="text-lg font-semibold">Mood Tracker</h2>
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

          {/* MOOD PICKER */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {moods.map((m, i) => (
              <button
                key={i}
                onClick={() => setSelectedMood(`${m.emoji} ${m.label}`)}
                className={`p-3 rounded-xl flex flex-col items-center justify-center transition
                  ${m.color}
                  ${
                    selectedMood === `${m.emoji} ${m.label}`
                      ? `ring-2 ${m.ringColor} scale-105`
                      : "opacity-70"
                  }
                `}
              >
                <span className="text-xl">{m.emoji}</span>
                <span className="text-xs">{m.label}</span>
              </button>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddMood}
            className="w-full bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition mb-4"
          >
            Save Mood
          </button>

          {/* LIST */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {moodData.length === 0 ? (
              <div className="text-center text-gray-400 py-6">
                Belum ada mood
              </div>
            ) : (
              moodData.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-pink-50 p-3 rounded-lg"
                >
                  <span className="font-medium">{item.mood}</span>
                  <span className="text-xs text-gray-500">
                    {item.time}
                  </span>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default MoodTracker;
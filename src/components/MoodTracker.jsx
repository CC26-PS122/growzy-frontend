import { useState } from "react";

function MoodTracker() {
  const [moodData, setMoodData] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const moods = [
    { label: "Happy", icon: "/images/happy_char.svg", color: "bg-yellow-400", ringColor: "ring-yellow-400" },
    { label: "Good", icon: "/images/good_char.svg", color: "bg-green-400", ringColor: "ring-green-400" },
    { label: "Neutral", icon: "/images/neutral_char.svg", color: "bg-gray-400", ringColor: "ring-gray-400" },
    { label: "Sad", icon: "/images/sad_char.svg", color: "bg-blue-400", ringColor: "ring-blue-400" },
    { label: "Angry", icon: "/images/angry_char.svg", color: "bg-red-400", ringColor: "ring-red-400" },
  ];

  const handleAddMood = () => {
    if (!selectedMood) return;

    const newData = {
      id: Date.now(),
      mood: selectedMood.label,
      icon: selectedMood.icon, // ✅ INI YANG KURANG
      note,
      time: new Date().toLocaleTimeString(),
    };

    setMoodData([newData, ...moodData]);
    setSelectedMood("");
    setNote("");
  };

  return (
    <div className="bg-transparent flex items-center justify-center p-2">
      {/* CARD */}
      <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-lg p-4 md:p-6">
        {/* HEADER */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-yellow-100 text-xl">
              <img src="/images/moodtracker.svg" className="w-10"></img>
            </div>
            <div>
              <h2 className="text-base md:text-lg font-semibold">Mood Tracker</h2>
              <p className="text-xs md:text-sm text-gray-400">
                Log your mood and feelings
              </p>
            </div>
          </div>

          <span
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
              }`}
          >
            ⌄
          </span>
        </div>

        {/* CONTENT */}
        <div
          className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[700px] mt-6" : "max-h-0"
            }`}
        >
          <hr className="mb-6" />

          {/* TITLE */}
          <p className="text-center text-gray-500 mb-4">
            How are you feeling today?
          </p>

          {/* MOOD SELECT */}
          <div className="flex justify-between md:justify-center p-4 gap-3 md:gap-4 mb-4 overflow-x-auto">
            {moods.map((m, i) => (
              <div
                key={i}
                onClick={() => setSelectedMood(m)}
                className={`flex flex-col items-center cursor-pointer p-3 rounded-xl transition-all duration-200 ease-out
                  ${selectedMood?.label === m.label
                    ? "bg-blue-100 ring-2 ring-blue-200 scale-105"
                    : "hover:bg-gray-100"
                  }
                    active:scale-95
                  `}
              >
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full ${m.color}`}
                >
                  <img src={m.icon} alt={m.label} className="w-10 h-10 md:w-12 md:h-12" />
                </div>

                <span className="text-xs mt-2 text-gray-600">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* NOTE */}
          <div className="mb-5">
            <p className="text-sm text-gray-500 mb-2">Add a note</p>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your feeling..."
              className="w-full bg-blue-100 rounded-xl p-3 text-sm md:text-base outline-none resize-none"
              rows={3}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddMood}
            className="w-full bg-blue-900 text-white py-2.5 md:py-3 rounded-full text-sm md:text-base"
          >
            Save
          </button>

          {/* LIST */}
          <div className="space-y-2 max-h-40 md:max-h-52 overflow-y-auto mt-4">
            {moodData.length === 0 ? (
              <div className="text-center text-gray-400 py-4">
                Belum ada mood
              </div>
            ) : (
              moodData.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col bg-blue-50 p-3 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <img src={item.icon} className="w-10 md:w-12"></img>
                      <span className="font-medium">{item.mood}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.time}
                    </span>
                  </div>
                  {item.note && (
                    <p className="text-sm text-gray-600 mt-1">
                      {item.note}
                    </p>
                  )}
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
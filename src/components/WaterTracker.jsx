import { useState } from "react";

function WaterTracker() {
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const target = 2000; // ml (bisa lo ubah)

  const options = [100, 200, 500];

  const handleAddWater = (amount) => {
    setTotal((prev) => Math.min(prev + amount, target));
  };

  const progress = (total / target) * 100;

  return (
    <div className="bg-transparent flex items-center justify-center p-2">
      <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-lg p-4 md:p-6">

        {/* HEADER */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-xl">
              <img src="/images/watertracker.png" className="w-4 md:w-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-semibold">Drink Tracker</h2>
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
              />
            </div>

            <div className="flex justify-between text-[10px] md:text-xs text-gray-400 mt-1">
              <span>0 mL</span>
              <span>{total} mL/ {target}mL</span>
            </div>
          </div>

          {/* BUTTON OPTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 mb-5">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAddWater(opt)}
                className="border border-gray-200 rounded-full py-2 text-sm hover:bg-blue-50 transition"
              >
                {opt} mL
              </button>
            ))}

          </div>

          {/* BUTTON SAVE*/}
          <div className="flex gap-2">

            <button className="w-full bg-blue-800 text-white p-3 rounded-full">
              Save
            </button>

            <button
              onClick={() => setTotal(0)}
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
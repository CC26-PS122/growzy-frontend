import { useState } from "react";

function WaterTracker() {
  const [waterData, setWaterData] = useState([]);
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false); // 🔥 dropdown state

  const handleAddWater = () => {
    if (!amount || amount <= 0) return;

    const newData = {
      id: Date.now(),
      amount: Number(amount),
      time: new Date().toLocaleTimeString(),
    };

    setWaterData([newData, ...waterData]);
    setAmount("");
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
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-lg">
              💧
            </div>
            <h2 className="text-lg font-semibold">Water Tracker</h2>
          </div>

          {/* ICON */}
          <span
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
              }`}
          >
            ⌄
          </span>
        </div>

        {/* CONTENT (DROPDOWN) */}
        <div
          className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[500px] mt-5" : "max-h-0"
            }`}
        >

          {/* INPUT */}
          <div className="flex gap-2 mb-5">
            <input
              type="number"
              placeholder="Jumlah air (ml)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none p-2 rounded-lg"
            />

            <button
              onClick={handleAddWater}
              className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition"
            >
              +
            </button>
          </div>

          {/* LIST */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {waterData.length === 0 ? (
              <div className="text-center text-gray-400 py-6">
                Belum ada data minum
              </div>
            ) : (
              waterData.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-blue-50 p-3 rounded-lg"
                >
                  <span className="font-medium text-blue-700">
                    {item.amount} ml
                  </span>
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

export default WaterTracker;
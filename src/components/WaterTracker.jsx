import { useState } from "react";

function WaterTracker() {
  const [waterData, setWaterData] = useState([]);
  const [amount, setAmount] = useState("");

  const handleAddWater = () => {
    if (!amount) return;

    const newData = {
      id: Date.now(),
      amount,
      time: new Date().toLocaleString(),
    };

    setWaterData([...waterData, newData]);
    setAmount("");
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Water Tracker 💧</h2>

      
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="number"
          placeholder="Jumlah air (ml)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleAddWater}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Water
        </button>
      </div>

      
      <div>
        {waterData.length === 0 ? (
          <p className="text-gray-500">Belum ada data minum</p>
        ) : (
          waterData.map((item) => (
            <div
              key={item.id}
              className="border p-2 rounded mb-2 flex justify-between"
            >
              <span>{item.amount} ml</span>
              <span className="text-sm text-gray-500">{item.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WaterTracker;
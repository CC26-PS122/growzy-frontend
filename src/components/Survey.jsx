import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Survey() {
  const [drink, setDrink] = useState("");
  const [mood, setMood] = useState("");
  const [sleep, setSleep] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!drink || !mood || !sleep) {
      alert("Semua harus diisi!");
      return;
    }

    const data = {
      drink_answer: drink,
      mood_answer: mood,
      sleep_answer: sleep,
    };

    console.log("Survey Data:", data);

    navigate("/features");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Survey Harian 📝
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Minum hari ini?"
            value={drink}
            onChange={(e) => setDrink(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Mood kamu?"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Tidur berapa jam?"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Survey;
import { useState, useRef } from "react";
import { fetchWithAuth } from "../../utils/api";

function SleepTracker({ onSaved }) {
  const [isOpen, setIsOpen] = useState(false);

  const [bedHour, setBedHour] = useState("");
  const [bedMinute, setBedMinute] = useState("");
  const [wakeHour, setWakeHour] = useState("");
  const [wakeMinute, setWakeMinute] = useState("");

  const bedHourRef = useRef(null);
  const bedMinuteRef = useRef(null);

  const wakeHourRef = useRef(null);
  const wakeMinuteRef = useRef(null);

  const handleHourChange = (val, setter, nextRef) => {
    if (val === "") return setter("");
    if (!/^\d+$/.test(val)) return;
    if (val.length > 2) return;
    if (val.length === 2 && parseInt(val) > 23) return;

    setter(val);

    if (val.length === 2 && nextRef?.current) {
      nextRef.current.focus();
    }
  };

  const handleMinuteChange = (val, setter, nextRef = null) => {
    if (val === "") return setter("");
    if (!/^\d+$/.test(val)) return;
    if (val.length > 2) return;
    if (val.length === 2 && parseInt(val) > 59) return;

    setter(val);

    if (val.length === 2 && nextRef?.current) {
      nextRef.current.focus();
    }
  };

  const calculateDuration = () => {
    if (!bedHour || !bedMinute || !wakeHour || !wakeMinute) {
      return "__h __m";
    }

    const start = new Date();
    start.setHours(Number(bedHour), Number(bedMinute));

    const end = new Date();
    end.setHours(Number(wakeHour), Number(wakeMinute));

    let diff = (end - start) / (1000 * 60);

    if (diff < 0) diff += 24 * 60;
    if (diff === 0) return "__h __m";

    const h = Math.floor(diff / 60);
    const m = diff % 60;

    return `${h}h ${m}m`;
  };

  const getTotalMinutes = () => {
    if (!bedHour || !bedMinute || !wakeHour || !wakeMinute) return 0;

    const start = new Date();
    start.setHours(Number(bedHour), Number(bedMinute));

    const end = new Date();
    end.setHours(Number(wakeHour), Number(wakeMinute));

    let diff = (end - start) / (1000 * 60);
    if (diff < 0) diff += 24 * 60;

    return Math.floor(diff);
  };

  const handleSaveSleep = async () => {
    try {
      const data = await fetchWithAuth("/auth/daily-logs", {
        method: "PUT",
        body: JSON.stringify({
          sleep_start: `${bedHour}:${bedMinute}`,
          sleep_end: `${wakeHour}:${wakeMinute}`,
          total_sleep_minutes: getTotalMinutes(),
        }),
      });

      if (!data.success) {
        alert("Gagal save!");
        return;
      }

      // 🔥 INI KUNCINYA
      onSaved && onSaved();

      alert("Sleep saved!");

      setBedHour("");
      setBedMinute("");
      setWakeHour("");
      setWakeMinute("");

    } catch (err) {
      console.error(err);
      alert("Error terjadi!");
    }
  };

  const isValid =
    bedHour &&
    bedMinute &&
    wakeHour &&
    wakeMinute &&
    calculateDuration() !== "__h __m";

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
              <img src="images/sleeptracker.svg" className="w-5 md:w-6" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-semibold">Sleep Tracker</h2>
              <p className="text-xs md:text-sm text-gray-400">
                Log your sleep time
              </p>
            </div>
          </div>

          <span className={`transition ${isOpen ? "rotate-180" : ""}`}>
            ⌄
          </span>
        </div>

        {/* CONTENT */}
        <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[600px] mt-3" : "max-h-0"}`}>

          {/* DIVIDER */}
          <div className="border-t border-blue-200 my-4 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-[1px] w-10 h-[2px] bg-blue-500 rounded-full"></div>
          </div>

          {/* TIME INPUT */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-5 text-center">

            {/* BEDTIME */}
            <div>
              <p className="text-sm text-gray-400 mb-2">Bedtime</p>
              <div className="flex gap-2 justify-center">
                <input
                  ref={bedHourRef}
                  type="text"
                  inputMode="numeric"
                  placeholder="HH"
                  value={bedHour}
                  onChange={(e) =>
                    handleHourChange(e.target.value, setBedHour, bedMinuteRef)
                  }
                  className="w-14 md:w-16 text-center bg-blue-100 rounded-lg p-2 md:p-3 text-sm md:text-base outline-none"
                />
                <span className="self-center">:</span>
                <input
                  ref={bedMinuteRef}
                  type="text"
                  inputMode="numeric"
                  placeholder="MM"
                  value={bedMinute}
                  onChange={(e) =>
                    handleMinuteChange(e.target.value, setBedMinute, wakeHourRef)
                  }
                  className="w-14 md:w-16 text-center bg-blue-100 rounded-lg p-2 md:p-3 text-sm md:text-base outline-none"
                />
              </div>
            </div>

            {/* WAKE UP */}
            <div>
              <p className="text-sm text-gray-400 mb-2">Wake Up</p>
              <div className="flex gap-2 justify-center">
                <input
                  ref={wakeHourRef}
                  type="text"
                  inputMode="numeric"
                  placeholder="HH"
                  value={wakeHour}
                  onChange={(e) =>
                    handleHourChange(e.target.value, setWakeHour, wakeMinuteRef)
                  }
                  className="w-14 md:w-16 text-center bg-blue-100 rounded-lg p-2 md:p-3 text-sm md:text-base outline-none"
                />
                <span className="self-center">:</span>
                <input
                  ref={wakeMinuteRef}
                  type="text"
                  inputMode="numeric"
                  placeholder="MM"
                  value={wakeMinute}
                  onChange={(e) =>
                    handleMinuteChange(e.target.value, setWakeMinute)
                  }
                  className="w-14 md:w-16 text-center bg-blue-100 rounded-lg p-2 md:p-3 text-sm md:text-base outline-none"
                />
              </div>
            </div>

          </div>

          {/* TOTAL */}
          <div className="bg-blue-100 rounded-xl p-4 md:p-5 py-6 md:py-7 text-center mb-5">
            <p className="text-xs md:text-sm text-gray-500 mb-1">Total</p>
            <p className="text-blue-700 font-semibold text-sm md:text-base">
              {calculateDuration()}
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSaveSleep}
            disabled={!isValid}
            className={`w-full py-2.5 md:py-3 rounded-full text-sm md:text-base text-white transition ${isValid
              ? "bg-blue-800 active:scale-95"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Save
          </button>

        </div>
      </div>
    </div>
  );
}

export default SleepTracker;
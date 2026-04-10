import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { fetchWithAuth } from "../utils/api";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [logs, setLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetchWithAuth("/auth/daily-logs");
        setLogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLogs();
  }, []);

  // 🔥 helper format YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let daysArray = [];

    // sebelum tanggal mulai
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    // isi tanggal
    for (let i = 1; i <= totalDays; i++) {
      daysArray.push(i);
    }

    // TAMBAHAN: isi sampai 42 kotak (6 minggu)
    while (daysArray.length < 42) {
      daysArray.push(null);
    }

    return daysArray;
  };

  const changeMonth = (type) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(
      type === "prev"
        ? currentDate.getMonth() - 1
        : currentDate.getMonth() + 1
    );
    setCurrentDate(newDate);
  };

  // 🔥 ambil log sesuai tanggal
  const getLogByDate = (dateStr) => {
    return logs.find((log) => log.log_date === dateStr);
  };

  const selectedLog = selectedDate
    ? getLogByDate(selectedDate)
    : null;

  return (
    <div className="bg-[#D2EEFF] min-h-screen flex items-start md:items-center justify-center pt-6 md:pt-0">

      <div className="max-w-7xl w-full px-4 py-6 md:py-0">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          {/* LEFT SIDE */}
          <div className="flex flex-col h-full">

            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Monthly Progress
            </h1>

            <div className="rounded-xl p-8 shadow-sm bg-white/50 flex-1 text-center">

              {!selectedDate ? (
                <>
                  <p className="text-gray-400">No date selected</p>
                  <p className="text-sm text-gray-300 mt-2">
                    Tap a date on the calendar
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-500 mb-2">Date</p>

                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-300 flex items-center justify-center mb-2">
                    <img
                      src={`/images/${selectedLog?.mood_types?.default_expression_asset || "neutral.png"}`}
                      className="w-12"
                    />
                  </div>

                  <p className="font-medium mb-4">{selectedDate}</p>

                  <hr className="mb-4" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sleep time</span>
                      <span>
                        {selectedLog?.total_sleep_minutes
                          ? `${Math.floor(selectedLog.total_sleep_minutes / 60)}h`
                          : "__"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Water intake</span>
                      <span>
                        {selectedLog?.total_water_ml || "__"} mL
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Mood</span>
                      <span>
                        {selectedLog?.mood_types?.mood_name || "__"}
                      </span>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-2 space-y-6">

            {/* 🔥 SAMAIN DENGAN DASHBOARD */}
            <Navbar />

            <div className="bg-white/50 rounded-xl p-6 shadow-sm ">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => changeMonth("prev")}>{"<"}</button>

                <h2 className="font-semibold text-[#004A78">
                  {currentDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </h2>

                <button onClick={() => changeMonth("next")}>{">"}</button>
              </div>

              {/* DAYS */}
              <div className="grid grid-cols-7 text-center mb-4 text-sm text-[#004A78] font-black justify-items-center">
                {days.map((day, i) => (
                  <div key={i} className="w-10 h-10 flex items-center justify-center">
                    {day}
                  </div>
                ))}
              </div>

              {/* DATE GRID */}
              <div className="grid grid-cols-7 gap-y-6 justify-items-center text-center">
                {getDaysInMonth().map((day, i) => {
                  if (!day) {
                    return <div key={i} className="w-10 h-10"></div>;
                  }

                  const dateObj = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  );

                  const dateStr = formatDate(dateObj);
                  const log = getLogByDate(dateStr);
                  const isSelected = selectedDate === dateStr;

                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-sm transition
                        ${isSelected ? "bg-[#0F3D5E] text-white" : ""}
                        ${log ? "font-bold text-[#0F3D5E]" : "text-gray-400"}
                        hover:bg-blue-100
                      `}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Calendar;
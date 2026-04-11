import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 Tambahkan ini
import Navbar from "../components/Navbar";
import { fetchWithAuth } from "../utils/api";
import { getMoodIcon } from "../utils/helpers";

function Calendar() {
  const navigate = useNavigate(); // 🔥 Inisialisasi navigate
  const [currentDate, setCurrentDate] = useState(new Date());
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 🔥 State Loading awal true
  const [selectedDate, setSelectedDate] = useState(null);

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  // --- KOMPONEN LOADING POPUP ---
  const LoadingPopup = () => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="bg-white/90 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-5 border border-white">

        {/* ICON MUTER-MUTER */}
        <div className="relative w-20 h-20">
          <img
            src="/images/char_happy.svg"
            alt="Loading..."
            className="w-full h-full animate-spin"
            style={{ animationDuration: '3s' }} // Biar muternya elegan, nggak bikin pusing
          />
        </div>

        {/* TEXT MENARIK */}
        <div className="text-center">
          <h3 className="text-[#004A78] font-bold text-lg">Hang tight!</h3>
          <p className="text-gray-500 text-sm font-medium animate-pulse">
            Moody is syncing your data...
          </p>
        </div>

      </div>
    </div>
  );

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true); // 🔥 Set loading tiap kali fetch (misal saat onSaved)
      try {
        const res = await fetchWithAuth("/auth/daily-logs");
        setLogs(res.data);
      } catch (err) {
        console.error(err);

        // 🔥 SISTEM AUTO LOGOUT JIKA TOKEN EXPIRED/INVALID
        if (err.message.includes("Unauthorized") || err.message.includes("401")) {
          localStorage.clear(); // Hapus semua cache termasuk token
          navigate("/login", { replace: true });
        }
      } finally {
        setIsLoading(false); // 🔥 Matikan loading apapun hasilnya
      }
    };

    fetchLogs();
  }, [navigate]); // Tambahkan navigate ke dependency array

  // --- Fungsi helper lainnya tetap sama ---
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    let daysArray = [];
    for (let i = 0; i < firstDay; i++) daysArray.push(null);
    for (let i = 1; i <= totalDays; i++) daysArray.push(i);
    while (daysArray.length < 42) daysArray.push(null);
    return daysArray;
  };

  const changeMonth = (type) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(type === "prev" ? currentDate.getMonth() - 1 : currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const getLogByDate = (dateStr) => logs.find((log) => log.log_date === dateStr);
  const selectedLog = selectedDate ? getLogByDate(selectedDate) : null;
  const todayStr = formatDate(new Date());
  const capitalize = (text) => text ? text.charAt(0).toUpperCase() + text.slice(1) : "__";
  const moodIcon = getMoodIcon(selectedLog);

  return (
    <div className="bg-[#D2EEFF] min-h-screen flex items-start md:items-center justify-center pb-12 md:pt-0">

      {/* 🔥 TAMPILKAN POPUP JIKA ISLOADING TRUE */}
      {isLoading && <LoadingPopup />}

      <div className="max-w-7xl w-full px-4 py-6 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 items-stretch">

          {/* LEFT SIDE: Progress Detail */}
          <div className="flex flex-col h-full">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center md:text-start">
              Monthly Progress
            </h1>
            <div className="rounded-xl p-8 shadow-sm bg-white/50 flex-1 text-center">
              {!selectedDate ? (
                <>
                  <p className="text-gray-400">No date selected</p>
                  <p className="text-sm text-gray-300 mt-2">Tap a date on the calendar</p>
                </>
              ) : (
                <>
                  <p className="font-medium mb-2">{selectedDate}</p>
                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-300 flex items-center justify-center mb-4">
                    <img
                      src={`/${moodIcon}`}
                      onError={(e) => { e.target.src = "/images/sleepy_char.svg"; }}
                      className="w-full"
                    />
                  </div>
                  <hr className="mb-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sleep time</span>
                      <span>{selectedLog?.total_sleep_minutes ? `${Math.floor(selectedLog.total_sleep_minutes / 60)}h` : "__"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Water intake</span>
                      <span>{selectedLog?.total_water_ml || "__"} mL</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mood</span>
                      <span>{capitalize(selectedLog?.mood_types?.mood_name)}</span>
                    </div>
                    <div className="mt-4 pt-2 border-t border-gray-500">
                      <p className="text-gray-600 text-sm mb-3">Note</p>
                      <div className="bg-white rounded-lg min-h-[50px] max-h-full overflow-y-auto scrollbar-thin">
                        <div className="p-3 text-sm text-start text-gray-700 min-h-[50px] max-h-[120px] md:max-h-[180px] overflow-y-auto break-words scrollbar-thin">
                          {selectedLog?.mood_note ? selectedLog.mood_note : "No note yet"}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Calendar */}
          <div className="md:col-span-2 space-y-6">
            <Navbar />
            <div className="bg-white/50 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => changeMonth("prev")}>{"<"}</button>
                <h2 className="font-semibold text-[#004A78]">
                  {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
                </h2>
                <button onClick={() => changeMonth("next")}>{">"}</button>
              </div>

              <div className="grid grid-cols-7 text-center mb-4 text-sm text-[#004A78] font-black justify-items-center">
                {days.map((day, i) => <div key={i} className="w-10 h-10 flex items-center justify-center">{day}</div>)}
              </div>

              <div className="grid grid-cols-7 gap-y-6 justify-items-center text-center">
                {getDaysInMonth().map((day, i) => {
                  if (!day) return <div key={i} className="w-10 h-10"></div>;
                  const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                  const dateStr = formatDate(dateObj);
                  const log = getLogByDate(dateStr);
                  const isSelected = selectedDate === dateStr;
                  const isToday = dateStr === todayStr;

                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-sm transition
                        ${isSelected ? "bg-[#0F3D5E] text-white" : ""}
                        ${isToday && !isSelected ? "font-extrabold text-[#0F3D5E]" : ""}
                        ${log && !isToday ? "font-bold text-[#0F3D5E]" : ""}
                        ${!log && !isToday && !isSelected ? "text-gray-400" : ""}
                        hover:bg-blue-100`}
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
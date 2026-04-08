import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function Calendar() {
  // const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let daysArray = [];

    // kosong sebelum tanggal mulai
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    // isi tanggal
    for (let i = 1; i <= totalDays; i++) {
      daysArray.push(i);
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

  return (
    <div className="min-h-screen bg-blue-100 p-6">

      <div className="grid md:grid-cols-3 gap-4">

        {/* LEFT PANEL */}
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-400">No date selected</p>
          <p className="text-sm text-gray-300 mt-2">
            Tap a date on the calendar
          </p>
        </div>

        {/* CALENDAR */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-4">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => changeMonth("prev")}>{"<"}</button>

            <h2 className="font-semibold">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <button onClick={() => changeMonth("next")}>{">"}</button>
          </div>

          {/* DAYS */}
          <div className="grid grid-cols-7 text-center mb-2">
            {days.map((day, i) => (
              <div key={i} className="font-semibold text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* DATE GRID */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {getDaysInMonth().map((day, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  day
                    ? "hover:bg-blue-200 cursor-pointer"
                    : ""
                }`}
              >
                {day || ""}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Calendar;
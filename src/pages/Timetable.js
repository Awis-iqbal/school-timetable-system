import { useEffect, useState } from "react";
import API from "../api";

function Timetable() {
  const [schedules, setSchedules] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [ClassID, setClassID] = useState("");
  const [SubjectID, setSubjectID] = useState("");
  const [TeacherID, setTeacherID] = useState("");
  const [RoomID, setRoomID] = useState("");
  const [PeriodID, setPeriodID] = useState("");
  const [DayOfWeek, setDayOfWeek] = useState("");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const periods = [
    { id: 1, time: "08:00 - 09:00" },
    { id: 2, time: "09:00 - 10:00" },
    { id: 3, time: "10:00 - 11:00" },
    { id: 4, time: "11:00 - 12:00" },
    { id: 5, time: "12:00 - 01:00" },
  ];

  const getSchedules = async () => {
    try {
      const res = await API.get("/schedules");
      setSchedules(res.data);
    } catch (error) {
      console.log("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    getSchedules();
  }, []);

  const saveSchedule = async () => {
    if (!ClassID || !SubjectID || !TeacherID || !RoomID || !PeriodID || !DayOfWeek) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/schedules", {
        ClassID,
        SubjectID,
        TeacherID,
        RoomID,
        PeriodID,
        DayOfWeek,
      });

      alert("Schedule Added Successfully");

      setClassID("");
      setSubjectID("");
      setTeacherID("");
      setRoomID("");
      setPeriodID("");
      setDayOfWeek("");
      setShowForm(false);

      getSchedules();
    } catch (error) {
      console.log("Full Error:", error);
      console.log("Backend Error:", error.response?.data);

      alert(error.response?.data?.sqlMessage || error.response?.data?.message || "Failed to Add Schedule");
    }
  };

  const getScheduleCell = (day, periodId) => {
    return schedules.find(
      (item) => item.DayOfWeek === day && Number(item.PeriodID) === Number(periodId)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 overflow-x-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">
              Weekly Timetable
            </h1>
            <p className="text-slate-500 mt-1">
              Manage this week's class schedule
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            + Add Schedule
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left min-w-[1000px]">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <th className="p-4">Day</th>
                {periods.map((period) => (
                  <th key={period.id} className="p-4 text-center">
                    Period {period.id}
                    <br />
                    <span className="text-xs font-normal">{period.time}</span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {days.map((day) => (
                <tr key={day} className="border-b hover:bg-blue-50 transition">
                  <td className="p-4 font-bold text-slate-800 bg-slate-50">
                    {day}
                  </td>

                  {periods.map((period) => {
                    const schedule = getScheduleCell(day, period.id);

                    return (
                      <td key={period.id} className="p-3 align-top">
                        {schedule ? (
                          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 shadow-sm">
                            <p className="font-bold text-blue-700">
                              {schedule.SubjectName || `Subject ID: ${schedule.SubjectID}`}
                            </p>

                            <p className="text-sm text-slate-600 mt-1">
                              Teacher: {schedule.TeacherName || schedule.TeacherID}
                            </p>

                            <p className="text-sm text-slate-600">
                              Room: {schedule.RoomNumber || schedule.RoomID}
                            </p>

                            <p className="text-xs text-slate-400 mt-2">
                              Class: {schedule.ClassName || schedule.ClassID}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-4 text-center text-slate-400">
                            Free
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[450px] shadow-2xl border border-slate-200">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Add Schedule
              </h2>

              <input
                type="text"
                placeholder="Class ID"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={ClassID}
                onChange={(e) => setClassID(e.target.value)}
              />

              <input
                type="text"
                placeholder="Subject ID"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={SubjectID}
                onChange={(e) => setSubjectID(e.target.value)}
              />

              <input
                type="text"
                placeholder="Teacher ID"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={TeacherID}
                onChange={(e) => setTeacherID(e.target.value)}
              />

              <input
                type="text"
                placeholder="Room ID"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={RoomID}
                onChange={(e) => setRoomID(e.target.value)}
              />

              <select
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={PeriodID}
                onChange={(e) => setPeriodID(e.target.value)}
              >
                <option value="">Select Period</option>
                {periods.map((period) => (
                  <option key={period.id} value={period.id}>
                    Period {period.id} - {period.time}
                  </option>
                ))}
              </select>

              <select
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={DayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
              >
                <option value="">Select Day</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-slate-500 text-white px-5 py-2 rounded-xl hover:bg-slate-600 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={saveSchedule}
                  className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Timetable;
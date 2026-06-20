import { useEffect, useState } from "react";
import API from "../api";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [search, setSearch] = useState("");

  const getAttendance = async () => {
    try {
      const res = await API.get(`/attendance?date=${date}`);
      setStudents(res.data);
    } catch (error) {
      console.log("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    getAttendance();
  }, [date]);

  const markAttendance = async (StudentID, Status) => {
    try {
      await API.post("/attendance", {
        StudentID,
        AttendanceDate: date,
        Status,
      });

      getAttendance();
    } catch (error) {
      console.log("Error marking attendance:", error);
      alert("Failed to mark attendance");
    }
  };

  const filteredStudents = students.filter((item) =>
    `${item.StudentID} ${item.FirstName} ${item.LastName} ${item.ClassID}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const presentCount = students.filter((s) => s.Status === "Present").length;
  const absentCount = students.filter((s) => s.Status === "Absent").length;
  const leaveCount = students.filter((s) => s.Status === "Leave").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">
              Attendance
            </h1>
            <p className="text-slate-500 mt-1">
              Mark student attendance professionally
            </p>
          </div>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-slate-300 p-3 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-500 text-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-lg font-semibold">Present</h3>
            <h1 className="text-4xl font-bold mt-2">{presentCount}</h1>
          </div>

          <div className="bg-red-500 text-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-lg font-semibold">Absent</h3>
            <h1 className="text-4xl font-bold mt-2">{absentCount}</h1>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-lg font-semibold">Leave</h3>
            <h1 className="text-4xl font-bold mt-2">{leaveCount}</h1>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 p-4 rounded-2xl mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-4 text-left">Student ID</th>
                <th className="p-4 text-left">Student Name</th>
                <th className="p-4 text-left">Class ID</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Mark Attendance</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((item) => (
                <tr
                  key={item.StudentID}
                  className="border-b hover:bg-slate-50 transition-all"
                >
                  <td className="p-4 font-bold text-slate-700">
                    {item.StudentID}
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-800">
                      {item.FirstName} {item.LastName}
                    </div>
                  </td>

                  <td className="p-4 text-slate-600">{item.ClassID}</td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        item.Status === "Present"
                          ? "bg-green-100 text-green-700"
                          : item.Status === "Absent"
                          ? "bg-red-100 text-red-700"
                          : item.Status === "Leave"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.Status || "Not Marked"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          markAttendance(item.StudentID, "Present")
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                      >
                        Present
                      </button>

                      <button
                        onClick={() =>
                          markAttendance(item.StudentID, "Absent")
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                      >
                        Absent
                      </button>

                      <button
                        onClick={() => markAttendance(item.StudentID, "Leave")}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
                      >
                        Leave
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-slate-500">
                    No Students Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
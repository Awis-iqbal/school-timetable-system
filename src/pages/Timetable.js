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
  const [SemesterID, setSemesterID] = useState("");
  const [DayOfWeek, setDayOfWeek] = useState("");

  const getSchedules = async () => {
    try {
      const res = await API.get("/schedules");
      setSchedules(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSchedules();
  }, []);

  const saveSchedule = async () => {
    try {
      await API.post("/schedules", {
        ClassID,
        SubjectID,
        TeacherID,
        RoomID,
        PeriodID,
        SemesterID,
        DayOfWeek,
      });

      alert("Schedule Added Successfully");

      setClassID("");
      setSubjectID("");
      setTeacherID("");
      setRoomID("");
      setPeriodID("");
      setSemesterID("");
      setDayOfWeek("");
      setShowForm(false);

      getSchedules();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Schedule");
    }
  };

  const grouped = schedules.reduce((acc, item) => {
    if (!acc[item.DayOfWeek]) acc[item.DayOfWeek] = [];
    acc[item.DayOfWeek].push(item);
    return acc;
  }, {});

  return (
    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Weekly Timetable
          </h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Add Schedule
          </button>
        </div>

        {/* TABLE */}
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 border">Day</th>
              <th className="p-3 border">Periods</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(grouped).map((day) => (
              <tr key={day}>
                <td className="p-3 border font-bold">
                  {day}
                </td>

                <td className="p-3 border">
                  <div className="flex flex-wrap gap-2">

                    {grouped[day].map((item) => (
                      <span
                        key={item.ScheduleID}
                        className="bg-blue-50 px-3 py-1 rounded-lg text-sm"
                      >
                        Subject: {item.SubjectName} <br />
                        Room: {item.RoomNumber} <br />
                        Teacher: {item.TeacherName}
                      </span>
                    ))}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FORM */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-[450px]">

              <h2 className="text-xl font-bold mb-4">
                Add Schedule
              </h2>

              <input
                type="text"
                placeholder="Class ID"
                className="border p-2 w-full mb-2"
                value={ClassID}
                onChange={(e) => setClassID(e.target.value)}
              />

              <input
                type="text"
                placeholder="Subject ID"
                className="border p-2 w-full mb-2"
                value={SubjectID}
                onChange={(e) => setSubjectID(e.target.value)}
              />

              <input
                type="text"
                placeholder="Teacher ID"
                className="border p-2 w-full mb-2"
                value={TeacherID}
                onChange={(e) => setTeacherID(e.target.value)}
              />

              <input
                type="text"
                placeholder="Room ID"
                className="border p-2 w-full mb-2"
                value={RoomID}
                onChange={(e) => setRoomID(e.target.value)}
              />

              <input
                type="text"
                placeholder="Period ID"
                className="border p-2 w-full mb-2"
                value={PeriodID}
                onChange={(e) => setPeriodID(e.target.value)}
              />

              <input
                type="text"
                placeholder="Semester ID"
                className="border p-2 w-full mb-2"
                value={SemesterID}
                onChange={(e) => setSemesterID(e.target.value)}
              />

              <input
                type="text"
                placeholder="Day (Monday, Tuesday...)"
                className="border p-2 w-full mb-3"
                value={DayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
              />

              <div className="flex justify-between">

                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={saveSchedule}
                  className="bg-green-600 text-white px-4 py-2 rounded"
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
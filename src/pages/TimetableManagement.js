import { useEffect, useState, useCallback } from "react";
import API from "../api";

function TimetableManagement() {
  const tabs = [
    "Periods",
    "Semesters",
    "Course Assignments",
    "Substitutions",
    "Timetable Versions",
    "Timetable Changes",
  ];

  const [activeTab, setActiveTab] = useState("Periods");
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const config = {
    Periods: {
      url: "/periods",
      fields: ["PeriodName", "StartTime", "EndTime"],
    },
    Semesters: {
      url: "/semesters",
      fields: ["SemesterName", "StartDate", "EndDate"],
    },
    "Course Assignments": {
      url: "/courseassignments",
      fields: ["TeacherID", "SubjectID", "ClassID"],
    },
    Substitutions: {
      url: "/substitutions",
      fields: [
        "OriginalTeacherID",
        "SubstituteTeacherID",
        "ScheduleID",
        "SubstituteDate",
      ],
    },
    "Timetable Versions": {
      url: "/timetableversions",
      fields: ["VersionName"],
    },
    "Timetable Changes": {
      url: "/timetablechanges",
      fields: ["ScheduleID", "ChangeDescription"],
    },
  };

  const current = config[activeTab];

  const getData = useCallback(async () => {
    try {
      const res = await API.get(current.url);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [current.url]);

  const getDropdownData = async () => {
    try {
      const teacherRes = await API.get("/teachers");
      const scheduleRes = await API.get("/schedules");

      setTeachers(teacherRes.data);
      setSchedules(scheduleRes.data);
    } catch (error) {
      console.log("Dropdown data error:", error);
    }
  };

  useEffect(() => {
    setForm({});
    getData();

    if (
      activeTab === "Substitutions" ||
      activeTab === "Course Assignments" ||
      activeTab === "Timetable Changes"
    ) {
      getDropdownData();
    }
  }, [getData, activeTab]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const saveData = async () => {
    const emptyField = current.fields.find((field) => !form[field]);

    if (emptyField) {
      alert(`Please fill ${emptyField}`);
      return;
    }

    try {
      await API.post(current.url, form);

      setSuccessMessage(`${activeTab} Added Successfully`);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      setForm({});
      getData();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.sqlMessage ||
          error.response?.data?.message ||
          "Failed to save data"
      );
    }
  };

  const getInputType = (field) => {
    if (field.toLowerCase().includes("date")) return "date";
    if (field.toLowerCase().includes("time")) return "time";
    if (field.toLowerCase().includes("id")) return "number";
    return "text";
  };

  const renderField = (field) => {
    if (
      activeTab === "Substitutions" &&
      (field === "OriginalTeacherID" || field === "SubstituteTeacherID")
    ) {
      return (
        <select
          key={field}
          value={form[field] || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          className="border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">
            {field === "OriginalTeacherID"
              ? "Select Original Teacher"
              : "Select Substitute Teacher"}
          </option>

          {teachers.map((teacher) => (
            <option key={teacher.TeacherID} value={teacher.TeacherID}>
              {teacher.TeacherID} - {teacher.FirstName} {teacher.LastName}
            </option>
          ))}
        </select>
      );
    }

    if (
      (activeTab === "Substitutions" || activeTab === "Timetable Changes") &&
      field === "ScheduleID"
    ) {
      return (
        <select
          key={field}
          value={form[field] || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          className="border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Select Schedule</option>

          {schedules.map((schedule) => (
            <option key={schedule.ScheduleID} value={schedule.ScheduleID}>
              {schedule.ScheduleID} - {schedule.DayOfWeek} -{" "}
              {schedule.SubjectName || schedule.SubjectID}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        key={field}
        type={getInputType(field)}
        placeholder={field}
        value={form[field] || ""}
        onChange={(e) => handleChange(field, e.target.value)}
        className="border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <h1 className="text-4xl font-extrabold text-slate-800">
          Timetable Management
        </h1>

        <p className="text-slate-500 mt-1 mb-8">
          Manage periods, semesters, versions, changes and substitutions
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-2xl font-semibold transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Add {activeTab}
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {current.fields.map((field) => renderField(field))}
          </div>

          <button
            onClick={saveData}
            className="mt-5 bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700"
          >
            Save
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full bg-white">
            <thead className="bg-slate-900 text-white">
              <tr>
                {data.length > 0 ? (
                  Object.keys(data[0]).map((key) => (
                    <th key={key} className="p-4 text-left">
                      {key}
                    </th>
                  ))
                ) : (
                  <th className="p-4 text-left">Records</th>
                )}
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-slate-50">
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="p-4 text-slate-700">
                        {String(value).slice(0, 30)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-8 text-center text-slate-500">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showSuccess && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[60]">
            <div className="bg-white w-[520px] rounded-2xl shadow-2xl p-10 text-center">
              <div className="w-28 h-28 mx-auto rounded-full border-4 border-green-100 flex items-center justify-center mb-6">
                <span className="text-green-400 text-6xl">✓</span>
              </div>

              <h2 className="text-4xl font-bold text-slate-700 mb-5">
                Added!
              </h2>

              <p className="text-xl text-slate-500">{successMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimetableManagement;
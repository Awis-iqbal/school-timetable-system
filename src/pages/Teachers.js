import { useEffect, useState } from "react";
import API from "../api";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [DepartmentID, setDepartmentID] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Qualification, setQualification] = useState("");

  const getTeachers = async () => {
    try {
      const res = await API.get("/teachers");
      setTeachers(res.data);
    } catch (error) {
      console.log("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const saveTeacher = async () => {
    try {
      await API.post("/teachers", {
        DepartmentID,
        FirstName,
        LastName,
        Email,
        Phone,
        Qualification,
      });

      alert("Teacher Added Successfully");

      setDepartmentID("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setQualification("");
      setShowForm(false);

      getTeachers();
    } catch (error) {
      console.log("Error saving teacher:", error);
      alert("Failed to Add Teacher");
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.FirstName} ${teacher.LastName} ${teacher.Email} ${teacher.Phone} ${teacher.Qualification}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">
              Teachers
            </h1>
            <p className="text-slate-500 mt-1">
              Manage all teacher records
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Add Teacher
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Teacher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 p-4 rounded-2xl mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.TeacherID}
              className="relative overflow-hidden bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Top Gradient */}
              <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

              {/* Avatar */}
              <div className="flex justify-center -mt-12">
                <div className="bg-white p-1 rounded-full shadow-xl">
                  <img
                    src={`https://i.pravatar.cc/150?img=${teacher.TeacherID}`}
                    alt=""
                    className="w-28 h-28 rounded-full object-cover border-4 border-white"
                  />
                </div>
              </div>

              <div className="p-6">
                {/* Name */}
                <h3 className="text-center text-2xl font-bold text-slate-800">
                  {teacher.FirstName} {teacher.LastName}
                </h3>

                {/* Qualification */}
                <div className="flex justify-center mt-3">
                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                    {teacher.Qualification}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Email</p>
                    <p className="text-slate-700 font-medium break-all">
                      {teacher.Email}
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Phone</p>
                    <p className="text-slate-700 font-medium">
                      {teacher.Phone}
                    </p>
                  </div>

                  {/* IDs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-2xl p-4 text-center">
                      <p className="text-xs text-slate-400">
                        Teacher ID
                      </p>
                      <p className="text-xl font-bold text-blue-700">
                        {teacher.TeacherID}
                      </p>
                    </div>

                    <div className="bg-indigo-50 rounded-2xl p-4 text-center">
                      <p className="text-xs text-slate-400">
                        Dept ID
                      </p>
                      <p className="text-xl font-bold text-indigo-700">
                        {teacher.DepartmentID}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredTeachers.length === 0 && (
            <div className="col-span-full text-center py-10 text-slate-500">
              No Teachers Found
            </div>
          )}
        </div>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-white p-8 rounded-3xl w-[450px] shadow-2xl">

              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Add Teacher
              </h2>

              <input
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Department ID"
                value={DepartmentID}
                onChange={(e) => setDepartmentID(e.target.value)}
              />

              <input
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="First Name"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Last Name"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <input
                type="email"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Qualification"
                value={Qualification}
                onChange={(e) => setQualification(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-slate-500 text-white px-5 py-2 rounded-xl hover:bg-slate-600"
                >
                  Cancel
                </button>

                <button
                  onClick={saveTeacher}
                  className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
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

export default Teachers;
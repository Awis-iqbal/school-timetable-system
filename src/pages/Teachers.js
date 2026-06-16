import { useEffect, useState } from "react";
import API from "../api";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl shadow">

        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Teachers</h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Add Teacher
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.TeacherID}
              className="bg-slate-100 p-5 rounded-xl hover:shadow-lg transition"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${teacher.TeacherID}`}
                alt=""
                className="w-20 h-20 rounded-full mx-auto"
              />

              <h3 className="text-center font-bold mt-3">
                {teacher.FirstName} {teacher.LastName}
              </h3>

              <p className="text-center text-gray-500">
                {teacher.Qualification}
              </p>

              <p className="text-center text-sm text-gray-400 mt-2">
                {teacher.Email}
              </p>

              <p className="text-center text-sm text-gray-400">
                {teacher.Phone}
              </p>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-[450px]">

              <h2 className="text-xl font-bold mb-4">
                Add Teacher
              </h2>

              <input
                className="border p-2 w-full mb-3"
                placeholder="Department ID"
                value={DepartmentID}
                onChange={(e) => setDepartmentID(e.target.value)}
              />

              <input
                className="border p-2 w-full mb-3"
                placeholder="First Name"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                className="border p-2 w-full mb-3"
                placeholder="Last Name"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <input
                type="email"
                className="border p-2 w-full mb-3"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="border p-2 w-full mb-3"
                placeholder="Phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                className="border p-2 w-full mb-3"
                placeholder="Qualification"
                value={Qualification}
                onChange={(e) => setQualification(e.target.value)}
              />

              <div className="flex justify-between">

                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={saveTeacher}
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

export default Teachers;
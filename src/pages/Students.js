import { useEffect, useState } from "react";
import API from "../api";

function Students() {
  const [students, setStudents] = useState([]);

  // form states
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [email, setEmail] = useState("");

  // FETCH STUDENTS
  const getStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // SAVE STUDENT (POST)
  const saveStudent = async () => {
    try {
      await API.post("/students", {
        name,
        class: studentClass,
        email,
      });

      alert("Student Added Successfully");

      setShowForm(false);
      setName("");
      setStudentClass("");
      setEmail("");

      getStudents(); // refresh table
    } catch (error) {
      console.log("Error saving student:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Students</h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
          >
            Add Student
          </button>
        </div>

        {/* SEARCH (UI only) */}
        <input
          type="text"
          placeholder="Search Student..."
          className="w-full border p-3 rounded-xl mb-6"
        />

        {/* TABLE */}
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3">ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {students.map((stu) => (
              <tr key={stu.id} className="border-b">
                <td className="p-3">{stu.id}</td>
                <td>{stu.firstName}</td>
                <td>{stu.lastname}</td>
                <td>{stu.gender}</td>
                <td>{stu.dateofbirth}</td>
                <td>{stu.email}</td>
                <td>{stu.phone}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full ${
                      stu.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {stu.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MODAL FORM */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-[400px]">

              <h2 className="text-xl font-bold mb-4">Add Student</h2>

              <input
                className="border p-2 w-full mb-3"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="border p-2 w-full mb-3"
                placeholder="Class"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
              />

              <input
                className="border p-2 w-full mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="flex justify-between">

                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={saveStudent}
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

export default Students;
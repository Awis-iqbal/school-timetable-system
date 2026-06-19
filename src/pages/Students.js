import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../api";

function Students() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [ClassID, setClassID] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Gender, setGender] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");

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

  const saveStudent = async () => {
    if (
      !ClassID ||
      !FirstName ||
      !LastName ||
      !Gender ||
      !DateOfBirth ||
      !Email ||
      !Phone
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields",
      });
      return;
    }

    try {
      await API.post("/students", {
        ClassID,
        FirstName,
        LastName,
        Gender,
        DateOfBirth,
        Email,
        Phone,
      });

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Student Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setShowForm(false);

      setClassID("");
      setFirstName("");
      setLastName("");
      setGender("");
      setDateOfBirth("");
      setEmail("");
      setPhone("");

      getStudents();
    } catch (error) {
      console.log("Error saving student:", error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to Add Student",
      });
    }
  };

  const deleteStudent = async (id) => {
    const result = await Swal.fire({
      title: "Delete Student?",
      text: "You won't be able to undo this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await API.delete(`/students/${id}`);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Student Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      getStudents();
    } catch (error) {
      console.log("Error deleting student:", error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to Delete Student",
      });
    }
  };

  const filteredStudents = students.filter((stu) =>
    `${stu.StudentID} ${stu.FirstName} ${stu.LastName} ${stu.Gender} ${stu.Email} ${stu.Phone} ${stu.ClassID}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">
              Students
            </h1>
            <p className="text-slate-500 mt-1">
              Manage all student records
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-md hover:scale-105 transition"
          >
            + Add Student
          </button>
        </div>

        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 p-4 rounded-2xl mb-8 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
        />

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700">
                <th className="p-4">ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Class ID</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((stu) => (
                <tr
                  key={stu.StudentID}
                  className="border-b hover:bg-blue-50 transition text-slate-700"
                >
                  <td className="p-4 font-semibold">{stu.StudentID}</td>
                  <td>{stu.FirstName}</td>
                  <td>{stu.LastName}</td>
                  <td>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {stu.Gender}
                    </span>
                  </td>
                  <td>{stu.DateOfBirth?.split("T")[0]}</td>
                  <td>{stu.Email}</td>
                  <td>{stu.Phone}</td>
                  <td>
                    <span className="bg-slate-200 px-3 py-1 rounded-full">
                      {stu.ClassID}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteStudent(stu.StudentID)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl shadow hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center p-6 text-slate-500"
                  >
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[450px] shadow-2xl border border-slate-200">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Add Student
              </h2>

              <input
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Class ID"
                value={ClassID}
                onChange={(e) => setClassID(e.target.value)}
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

              <select
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <input
                type="date"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={DateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />

              <input
                type="email"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-slate-400 px-5 py-2 rounded-xl text-white hover:bg-slate-500 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={saveStudent}
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

export default Students;
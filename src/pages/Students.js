import { useEffect, useState } from "react";
import API from "../api";

function Students() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

      alert("Student Added Successfully");

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
      alert("Failed to Add Student");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Students</h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
          >
            Add Student
          </button>
        </div>

        <input
          type="text"
          placeholder="Search Student..."
          className="w-full border p-3 rounded-xl mb-6"
        />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="p-3">ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Class ID</th>
              </tr>
            </thead>

            <tbody>
              {students.map((stu) => (
                <tr key={stu.StudentID} className="border-b">
                  <td className="p-3">{stu.StudentID}</td>
                  <td>{stu.FirstName}</td>
                  <td>{stu.LastName}</td>
                  <td>{stu.Gender}</td>
                  <td>{stu.DateOfBirth?.split("T")[0]}</td>
                  <td>{stu.Email}</td>
                  <td>{stu.Phone}</td>
                  <td>{stu.ClassID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-[450px]">

              <h2 className="text-xl font-bold mb-4">
                Add Student
              </h2>

              <input
                className="border p-2 w-full mb-3"
                placeholder="Class ID"
                value={ClassID}
                onChange={(e) => setClassID(e.target.value)}
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

              <select
                className="border p-2 w-full mb-3"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <input
                type="date"
                className="border p-2 w-full mb-3"
                value={DateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
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

              <div className="flex justify-between">

                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 px-4 py-2 rounded text-white"
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
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../api";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [DepartmentID, setDepartmentID] = useState("");
  const [SubjectName, setSubjectName] = useState("");
  const [SubjectCode, setSubjectCode] = useState("");

  const getSubjects = async () => {
    try {
      const res = await API.get("/subjects");
      setSubjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  const saveSubject = async () => {
    if (!DepartmentID || !SubjectName || !SubjectCode) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields",
      });
      return;
    }

    try {
      await API.post("/subjects", {
        DepartmentID,
        SubjectName,
        SubjectCode,
      });

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Subject Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setDepartmentID("");
      setSubjectName("");
      setSubjectCode("");
      setShowForm(false);

      getSubjects();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to Add Subject",
      });
    }
  };

  const deleteSubject = async (id) => {
    const result = await Swal.fire({
      title: "Delete Subject?",
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
      await API.delete(`/subjects/${id}`);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Subject Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      getSubjects();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to Delete Subject",
      });
    }
  };

  const filteredSubjects = subjects.filter((sub) =>
    `${sub.SubjectID} ${sub.DepartmentID} ${sub.SubjectName} ${sub.SubjectCode}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">
              Subjects
            </h1>
            <p className="text-slate-500 mt-1">
              Manage all subject records
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Add Subject
          </button>
        </div>

        <input
          type="text"
          placeholder="Search Subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 p-4 rounded-2xl mb-8 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
        />

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700">
                <th className="p-4">ID</th>
                <th>Department ID</th>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubjects.map((sub) => (
                <tr
                  key={sub.SubjectID}
                  className="border-b hover:bg-blue-50 transition text-slate-700"
                >
                  <td className="p-4 font-semibold">{sub.SubjectID}</td>

                  <td>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {sub.DepartmentID}
                    </span>
                  </td>

                  <td className="font-medium">{sub.SubjectName}</td>

                  <td>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {sub.SubjectCode}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => deleteSubject(sub.SubjectID)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl shadow hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredSubjects.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6 text-slate-500"
                  >
                    No subjects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[400px] shadow-2xl border border-slate-200">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Add Subject
              </h2>

              <input
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Department ID"
                value={DepartmentID}
                onChange={(e) => setDepartmentID(e.target.value)}
              />

              <input
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Subject Name"
                value={SubjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />

              <input
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Subject Code"
                value={SubjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-slate-500 text-white px-5 py-2 rounded-xl hover:bg-slate-600 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={saveSubject}
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

export default Subjects;
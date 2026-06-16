import { useEffect, useState } from "react";
import API from "../api";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [DepartmentID, setDepartmentID] = useState("");
  const [SubjectName, setSubjectName] = useState("");
  const [SubjectCode, setSubjectCode] = useState("");

  // GET SUBJECTS
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

  // SAVE SUBJECT
  const saveSubject = async () => {
    try {
      await API.post("/subjects", {
        DepartmentID,
        SubjectName,
        SubjectCode,
      });

      alert("Subject Added Successfully");

      setDepartmentID("");
      setSubjectName("");
      setSubjectCode("");
      setShowForm(false);

      getSubjects();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Subject");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl shadow">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Subjects</h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Add Subject
          </button>
        </div>

        {/* TABLE */}
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3">ID</th>
              <th>Department ID</th>
              <th>Subject Name</th>
              <th>Subject Code</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((sub) => (
              <tr key={sub.SubjectID} className="border-b">
                <td className="p-3">{sub.SubjectID}</td>
                <td>{sub.DepartmentID}</td>
                <td>{sub.SubjectName}</td>
                <td>{sub.SubjectCode}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FORM */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-[400px]">

              <h2 className="text-xl font-bold mb-4">
                Add Subject
              </h2>

              <input
                className="border p-2 w-full mb-3"
                placeholder="Department ID"
                value={DepartmentID}
                onChange={(e) =>
                  setDepartmentID(e.target.value)
                }
              />

              <input
                className="border p-2 w-full mb-3"
                placeholder="Subject Name"
                value={SubjectName}
                onChange={(e) =>
                  setSubjectName(e.target.value)
                }
              />

              <input
                className="border p-2 w-full mb-3"
                placeholder="Subject Code"
                value={SubjectCode}
                onChange={(e) =>
                  setSubjectCode(e.target.value)
                }
              />

              <div className="flex justify-between">

                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={saveSubject}
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

export default Subjects;
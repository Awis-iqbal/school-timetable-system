import { useEffect, useState } from "react";
import API from "../api";

function Exams() {
  const [exams, setExams] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [SubjectID, setSubjectID] = useState("");
  const [ExamName, setExamName] = useState("");
  const [ExamDate, setExamDate] = useState("");
  const [TotalMarks, setTotalMarks] = useState("");

  const getExams = async () => {
    try {
      const res = await API.get("/exams");
      setExams(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  const saveExam = async () => {
    try {
      await API.post("/exams", {
        SubjectID,
        ExamName,
        ExamDate,
        TotalMarks,
      });

      alert("Exam Added Successfully");

      setSubjectID("");
      setExamName("");
      setExamDate("");
      setTotalMarks("");
      setShowForm(false);

      getExams();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Exam");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl shadow">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Exam Schedule
          </h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Add Exam
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3">ID</th>
              <th>Subject ID</th>
              <th>Exam Name</th>
              <th>Date</th>
              <th>Total Marks</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam) => (
              <tr key={exam.ExamID} className="border-b">
                <td className="p-3">{exam.ExamID}</td>
                <td>{exam.SubjectID}</td>
                <td>{exam.ExamName}</td>
                <td>{exam.ExamDate?.split("T")[0]}</td>
                <td>{exam.TotalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-[400px]">

              <h2 className="text-xl font-bold mb-4">
                Add Exam
              </h2>

              <input
                type="number"
                placeholder="Subject ID"
                className="border p-2 w-full mb-3"
                value={SubjectID}
                onChange={(e) => setSubjectID(e.target.value)}
              />

              <input
                type="text"
                placeholder="Exam Name"
                className="border p-2 w-full mb-3"
                value={ExamName}
                onChange={(e) => setExamName(e.target.value)}
              />

              <input
                type="date"
                className="border p-2 w-full mb-3"
                value={ExamDate}
                onChange={(e) => setExamDate(e.target.value)}
              />

              <input
                type="number"
                placeholder="Total Marks"
                className="border p-2 w-full mb-3"
                value={TotalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
              />

              <div className="flex justify-between">

                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={saveExam}
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

export default Exams;
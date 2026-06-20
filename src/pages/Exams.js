import { useEffect, useState } from "react";
import API from "../api";

function Exams() {
  const [exams, setExams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

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
    if (!SubjectID || !ExamName || !ExamDate || !TotalMarks) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/exams", {
        SubjectID,
        ExamName,
        ExamDate,
        TotalMarks,
      });

      setSubjectID("");
      setExamName("");
      setExamDate("");
      setTotalMarks("");
      setShowForm(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      getExams();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to Add Exam");
    }
  };

  const openDeleteModal = (id) => {
    setSelectedExam(id);
    setShowDeleteModal(true);
  };

  const deleteExam = async () => {
    try {
      await API.delete(`/exams/${selectedExam}`);

      setShowDeleteModal(false);
      setSelectedExam(null);

      alert("Exam Deleted Successfully");
      getExams();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to Delete Exam");
    }
  };

  const filteredExams = exams.filter(
    (exam) =>
      exam.ExamName?.toLowerCase().includes(search.toLowerCase()) ||
      String(exam.ExamID).includes(search) ||
      String(exam.SubjectID).includes(search) ||
      String(exam.TotalMarks).includes(search)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">
              Exam Schedule
            </h1>
            <p className="text-slate-500 mt-1">
              Manage exams, dates and total marks
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition font-semibold"
          >
            + Add Exam
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search exam by ID, subject ID, name or marks..."
            className="w-full md:w-[450px] border border-slate-300 p-3 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left min-w-[850px]">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <th className="p-4">ID</th>
                <th className="p-4">Subject ID</th>
                <th className="p-4">Exam Name</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total Marks</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredExams.length > 0 ? (
                filteredExams.map((exam) => (
                  <tr
                    key={exam.ExamID}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="p-4 font-semibold text-slate-700">
                      {exam.ExamID}
                    </td>

                    <td className="p-4 text-slate-600">{exam.SubjectID}</td>

                    <td className="p-4 font-bold text-slate-800">
                      {exam.ExamName}
                    </td>

                    <td className="p-4 text-slate-600">
                      {exam.ExamDate?.split("T")[0]}
                    </td>

                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        {exam.TotalMarks}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => openDeleteModal(exam.ExamID)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-8 text-center text-slate-500 font-medium"
                  >
                    No exams found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[430px] shadow-2xl border border-slate-200">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-800">
                  Add Exam
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Enter exam details below
                </p>
              </div>

              <input
                type="number"
                placeholder="Subject ID"
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={SubjectID}
                onChange={(e) => setSubjectID(e.target.value)}
              />

              <input
                type="text"
                placeholder="Exam Name"
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={ExamName}
                onChange={(e) => setExamName(e.target.value)}
              />

              <input
                type="date"
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={ExamDate}
                onChange={(e) => setExamDate(e.target.value)}
              />

              <input
                type="number"
                placeholder="Total Marks"
                className="border border-slate-300 p-3 w-full mb-6 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={TotalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-slate-500 hover:bg-slate-600 text-white px-5 py-3 rounded-xl transition font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={saveExam}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition font-medium"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[60]">
            <div className="bg-white w-[520px] rounded-2xl shadow-2xl p-10 text-center">
              <div className="w-28 h-28 mx-auto rounded-full border-4 border-green-100 flex items-center justify-center mb-6">
                <span className="text-green-400 text-6xl">✓</span>
              </div>

              <h2 className="text-4xl font-bold text-slate-700 mb-5">
                Added!
              </h2>

              <p className="text-xl text-slate-500">
                Exam Added Successfully
              </p>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-2xl w-[420px] p-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-100 flex items-center justify-center text-4xl">
                  🗑️
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Delete Exam
                </h2>

                <p className="text-slate-500">
                  Are you sure you want to delete this exam?
                </p>

                <p className="text-slate-400 text-sm mt-2">
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedExam(null);
                  }}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>

                <button
                  onClick={deleteExam}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  Delete
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
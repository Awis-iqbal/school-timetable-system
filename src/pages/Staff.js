import { useEffect, useState } from "react";
import API from "../api";

function Staff() {
  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");

  const [DepartmentID, setDepartmentID] = useState("");
  const [FullName, setFullName] = useState("");
  const [Position, setPosition] = useState("");
  const [Phone, setPhone] = useState("");

  const getStaff = async () => {
    try {
      const res = await API.get("/staff");
      setStaff(res.data);
    } catch (error) {
      console.log("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  const saveStaff = async () => {
    if (!DepartmentID || !FullName || !Position || !Phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/staff", {
        DepartmentID,
        FullName,
        Position,
        Phone,
      });

      setDepartmentID("");
      setFullName("");
      setPosition("");
      setPhone("");
      setShowForm(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      getStaff();
    } catch (error) {
      console.log("Error saving staff:", error);
      alert("Failed to add staff");
    }
  };

  const filteredStaff = staff.filter((item) =>
    `${item.StaffID} ${item.DepartmentID} ${item.FullName} ${item.Position} ${item.Phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">Staff</h1>
            <p className="text-slate-500 mt-1">Manage all staff records</p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Add Staff
          </button>
        </div>

        <input
          type="text"
          placeholder="Search Staff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 p-4 rounded-2xl mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {filteredStaff.map((item) => (
            <div
              key={item.StaffID}
              className="relative overflow-hidden bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

              <div className="flex justify-center -mt-10">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center border-4 border-white">
                  <span className="text-3xl font-extrabold text-blue-700">
                    {item.FullName?.charAt(0)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-center text-2xl font-bold text-slate-800">
                  {item.FullName}
                </h2>

                <div className="flex justify-center mt-3">
                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                    {item.Position}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-100">
                    <p className="text-xs text-slate-400">Staff ID</p>
                    <p className="text-xl font-bold text-blue-700">
                      {item.StaffID}
                    </p>
                  </div>

                  <div className="bg-indigo-50 rounded-2xl p-4 text-center border border-indigo-100">
                    <p className="text-xs text-slate-400">Department ID</p>
                    <p className="text-xl font-bold text-indigo-700">
                      {item.DepartmentID}
                    </p>
                  </div>

                  <div className="col-span-2 bg-slate-50 rounded-2xl p-4 text-center border border-slate-200">
                    <p className="text-xs text-slate-400">Phone</p>
                    <p className="text-lg font-bold text-slate-700">
                      {item.Phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredStaff.length === 0 && (
            <div className="col-span-full text-center py-10 text-slate-500">
              No Staff Found
            </div>
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[400px] shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Add Staff
              </h2>

              <input
                type="number"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Department ID"
                value={DepartmentID}
                onChange={(e) => setDepartmentID(e.target.value)}
              />

              <input
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Full Name"
                value={FullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <input
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Position"
                value={Position}
                onChange={(e) => setPosition(e.target.value)}
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
                  className="bg-slate-500 text-white px-5 py-2 rounded-xl hover:bg-slate-600"
                >
                  Cancel
                </button>

                <button
                  onClick={saveStaff}
                  className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
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
                Staff Added Successfully
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Staff;
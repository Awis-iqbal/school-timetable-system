import { useEffect, useState } from "react";
import API from "../api";

function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [HolidayName, setHolidayName] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  const getHolidays = async () => {
    try {
      const res = await API.get("/holidays");
      setHolidays(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHolidays();
  }, []);

  const saveHoliday = async () => {
    if (!HolidayName || !StartDate || !EndDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/holidays", {
        HolidayName,
        StartDate,
        EndDate,
      });

      alert("Holiday Added Successfully");

      setHolidayName("");
      setStartDate("");
      setEndDate("");
      setShowForm(false);

      getHolidays();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Holiday");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">
              Holidays
            </h1>
            <p className="text-slate-500 mt-1">
              Manage academic holidays and school breaks
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition font-semibold"
          >
            + Add Holiday
          </button>
        </div>

        {holidays.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-12 text-center">
            <div className="text-5xl mb-4">🏖️</div>
            <h2 className="text-xl font-bold text-slate-700">
              No Holidays Found
            </h2>
            <p className="text-slate-500 mt-2">
              Click Add Holiday to create your first holiday.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {holidays.map((holiday) => (
              <div
                key={holiday.HolidayID}
                className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                    🎉
                  </div>

                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                    Holiday
                  </span>
                </div>

                <h2 className="font-extrabold text-2xl text-slate-800 mb-4">
                  {holiday.HolidayName}
                </h2>

                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-xs uppercase tracking-wide text-slate-400 font-bold">
                      Start Date
                    </p>
                    <p className="text-slate-700 font-semibold mt-1">
                      {holiday.StartDate?.split("T")[0]}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-xs uppercase tracking-wide text-slate-400 font-bold">
                      End Date
                    </p>
                    <p className="text-slate-700 font-semibold mt-1">
                      {holiday.EndDate?.split("T")[0]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[430px] shadow-2xl border border-slate-200">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-800">
                  Add Holiday
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Enter holiday details below
                </p>
              </div>

              <input
                type="text"
                placeholder="Holiday Name"
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={HolidayName}
                onChange={(e) => setHolidayName(e.target.value)}
              />

              <input
                type="date"
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={StartDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <input
                type="date"
                className="border border-slate-300 p-3 w-full mb-6 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={EndDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-slate-500 hover:bg-slate-600 text-white px-5 py-3 rounded-xl transition font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={saveHoliday}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition font-medium"
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

export default Holidays;
import { useEffect, useState } from "react";
import API from "../api";

function ClassroomAvailability() {
  const [availability, setAvailability] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [RoomID, setRoomID] = useState("");
  const [AvailableDate, setAvailableDate] = useState("");
  const [Status, setStatus] = useState("Available");

  const getAvailability = async () => {
    try {
      const res = await API.get("/classroomavailability");
      setAvailability(res.data);
    } catch (error) {
      console.log("Error fetching availability:", error);
    }
  };

  useEffect(() => {
    getAvailability();
  }, []);

  const saveAvailability = async () => {
    if (!RoomID || !AvailableDate || !Status) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/classroomavailability", {
        RoomID,
        AvailableDate,
        Status,
      });

      alert("Room Availability Added Successfully");

      setRoomID("");
      setAvailableDate("");
      setStatus("Available");
      setShowForm(false);

      getAvailability();
    } catch (error) {
      console.log("Error saving availability:", error);
      alert("Failed to add availability");
    }
  };

  const filteredAvailability = availability.filter((item) =>
    `${item.AvailabilityID} ${item.RoomID} ${item.AvailableDate} ${item.Status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    if (status === "Available")
      return "bg-green-100 text-green-700 border-green-200";
    if (status === "Occupied")
      return "bg-red-100 text-red-700 border-red-200";
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">
              Classroom Availability
            </h1>
            <p className="text-slate-500 mt-1">
              Check rooms are available, occupied, or reserved
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Add Availability
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by Room ID, Date or Status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 p-4 rounded-2xl mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {filteredAvailability.map((item) => (
            <div
              key={item.AvailabilityID}
              className="relative overflow-hidden bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`h-24 ${
                  item.Status === "Available"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : item.Status === "Occupied"
                    ? "bg-gradient-to-r from-red-500 to-rose-600"
                    : "bg-gradient-to-r from-yellow-500 to-orange-500"
                }`}
              ></div>

              <div className="flex justify-center -mt-10">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center border-4 border-white">
                  <span className="text-3xl font-extrabold text-blue-700">
                    R
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-center text-2xl font-bold text-slate-800">
                  Room ID: {item.RoomID}
                </h2>

                <div className="flex justify-center mt-3">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold border ${getStatusStyle(
                      item.Status
                    )}`}
                  >
                    {item.Status}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-100">
                    <p className="text-xs text-slate-400">Availability ID</p>
                    <p className="text-xl font-bold text-blue-700">
                      {item.AvailabilityID}
                    </p>
                  </div>

                  <div className="bg-indigo-50 rounded-2xl p-4 text-center border border-indigo-100">
                    <p className="text-xs text-slate-400">Date</p>
                    <p className="text-sm font-bold text-indigo-700">
                      {item.AvailableDate?.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredAvailability.length === 0 && (
            <div className="col-span-full text-center py-10 text-slate-500">
              No Room Availability Found
            </div>
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[400px] shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Add Room Availability
              </h2>

              <input
                type="number"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Room ID"
                value={RoomID}
                onChange={(e) => setRoomID(e.target.value)}
              />

              <input
                type="date"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={AvailableDate}
                onChange={(e) => setAvailableDate(e.target.value)}
              />

              <select
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Reserved">Reserved</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-slate-500 text-white px-5 py-2 rounded-xl hover:bg-slate-600"
                >
                  Cancel
                </button>

                <button
                  onClick={saveAvailability}
                  className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
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

export default ClassroomAvailability;
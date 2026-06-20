import { useEffect, useState } from "react";
import API from "../api";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [RoomNumber, setRoomNumber] = useState("");
  const [Capacity, setCapacity] = useState("");
  const [RoomType, setRoomType] = useState("");

  const getRooms = async () => {
    try {
      const res = await API.get("/rooms");
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const saveRoom = async () => {
    if (!RoomNumber || !Capacity || !RoomType) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/rooms", {
        RoomNumber,
        Capacity,
        RoomType,
      });

      setRoomNumber("");
      setCapacity("");
      setRoomType("");
      setShowForm(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      getRooms();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Room");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">
              Rooms
            </h1>
            <p className="text-slate-500 mt-1">
              Manage all school rooms and labs
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Add Room
          </button>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div
              key={room.RoomID}
              className="relative overflow-hidden bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

              <div className="flex justify-center -mt-10">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center border-4 border-white">
                  <span className="text-3xl font-extrabold text-blue-700">
                    {room.RoomNumber?.toString().charAt(0)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-center text-2xl font-bold text-slate-800">
                  Room {room.RoomNumber}
                </h2>

                <div className="flex justify-center mt-3">
                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                    {room.RoomType}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-100">
                    <p className="text-xs text-slate-400">Room ID</p>
                    <p className="text-xl font-bold text-blue-700">
                      {room.RoomID}
                    </p>
                  </div>

                  <div className="bg-indigo-50 rounded-2xl p-4 text-center border border-indigo-100">
                    <p className="text-xs text-slate-400">Capacity</p>
                    <p className="text-xl font-bold text-indigo-700">
                      {room.Capacity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {rooms.length === 0 && (
            <div className="col-span-full text-center py-10 text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
              No Rooms Found
            </div>
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[400px] shadow-2xl border border-slate-200">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Add Room
              </h2>

              <input
                type="text"
                placeholder="Room Number"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={RoomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />

              <input
                type="number"
                placeholder="Capacity"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={Capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />

              <input
                type="text"
                placeholder="Room Type"
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={RoomType}
                onChange={(e) => setRoomType(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-slate-500 text-white px-5 py-2 rounded-xl hover:bg-slate-600 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={saveRoom}
                  className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition"
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
                Room Added Successfully
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;
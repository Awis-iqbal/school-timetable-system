import { useEffect, useState } from "react";
import API from "../api";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
    try {
      await API.post("/rooms", {
        RoomNumber,
        Capacity,
        RoomType,
      });

      alert("Room Added Successfully");

      setRoomNumber("");
      setCapacity("");
      setRoomType("");
      setShowForm(false);

      getRooms();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Room");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl shadow">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Rooms</h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Add Room
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {rooms.map((room) => (
            <div
              key={room.RoomID}
              className="bg-white border p-6 rounded-2xl shadow hover:shadow-xl"
            >
              <h2 className="font-bold text-xl">
                {room.RoomNumber}
              </h2>

              <p className="text-gray-500 mt-2">
                Capacity: {room.Capacity}
              </p>

              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
                {room.RoomType}
              </span>
            </div>
          ))}

        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-[400px]">

              <h2 className="text-xl font-bold mb-4">
                Add Room
              </h2>

              <input
                type="text"
                placeholder="Room Number"
                className="border p-2 w-full mb-3"
                value={RoomNumber}
                onChange={(e) =>
                  setRoomNumber(e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Capacity"
                className="border p-2 w-full mb-3"
                value={Capacity}
                onChange={(e) =>
                  setCapacity(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Room Type"
                className="border p-2 w-full mb-3"
                value={RoomType}
                onChange={(e) =>
                  setRoomType(e.target.value)
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
                  onClick={saveRoom}
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

export default Rooms;
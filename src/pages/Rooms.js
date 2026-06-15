function Rooms() {
  const rooms = [
    { room: "A101", status: "Available" },
    { room: "A102", status: "Occupied" },
    { room: "B201", status: "Available" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Rooms</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="font-bold text-xl">
              {room.room}
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                room.status === "Available"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {room.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
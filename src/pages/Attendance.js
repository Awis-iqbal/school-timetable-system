function Attendance() {
  return (
    <div className="p-6">
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-green-500 text-white p-6 rounded-2xl">
          <h3>Present</h3>
          <h1 className="text-4xl font-bold">92%</h1>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-2xl">
          <h3>Absent</h3>
          <h1 className="text-4xl font-bold">5%</h1>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-2xl">
          <h3>Late</h3>
          <h1 className="text-4xl font-bold">3%</h1>
        </div>

      </div>
    </div>
  );
}

export default Attendance;
function Timetable() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">

        <h1 className="text-3xl font-bold mb-6">
          Weekly Timetable
        </h1>

        <table className="w-full">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3">Day</th>
              <th>8-9</th>
              <th>9-10</th>
              <th>10-11</th>
              <th>11-12</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-3">Monday</td>
              <td>Math</td>
              <td>CS</td>
              <td>English</td>
              <td>Physics</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Timetable;
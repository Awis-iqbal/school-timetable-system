import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaBook,
  FaCalendarAlt,
  FaBell,
} from "react-icons/fa";

function Dashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,200",
      icon: <FaUserGraduate />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Teachers",
      value: "85",
      icon: <FaChalkboardTeacher />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Classes",
      value: "40",
      icon: <FaSchool />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Subjects",
      value: "25",
      icon: <FaBook />,
      color: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome to School Timetable Management System
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg">
          Generate Timetable
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${item.color}
            text-white rounded-3xl p-6 shadow-xl
            hover:scale-105 transition-all duration-300`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">
                  {item.title}
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {item.value}
                </h2>
              </div>

              <div className="text-5xl opacity-80">
                {item.icon}
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Middle Section */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Timetable Overview */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6">

          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Weekly Timetable
            </h2>

            <FaCalendarAlt className="text-3xl text-blue-600" />
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="p-3">Day</th>
                <th>8-9</th>
                <th>9-10</th>
                <th>10-11</th>
                <th>11-12</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-3 font-semibold">Monday</td>
                <td>Math</td>
                <td>Physics</td>
                <td>English</td>
                <td>CS</td>
              </tr>

              <tr className="border-b">
                <td className="p-3 font-semibold">Tuesday</td>
                <td>CS</td>
                <td>Math</td>
                <td>Urdu</td>
                <td>Physics</td>
              </tr>

              <tr>
                <td className="p-3 font-semibold">Wednesday</td>
                <td>English</td>
                <td>Math</td>
                <td>CS</td>
                <td>Chemistry</td>
              </tr>
            </tbody>
          </table>

        </div>

        {/* Notifications */}
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              Notifications
            </h2>

            <FaBell className="text-blue-600 text-2xl" />
          </div>

          <div className="space-y-4">

            <div className="bg-blue-50 p-4 rounded-xl">
              📢 New timetable published
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              ✅ Attendance updated
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl">
              📝 Exam schedule uploaded
            </div>

            <div className="bg-red-50 p-4 rounded-xl">
              🎉 Sports week announced
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Activities */}
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Recent Activities
          </h2>

          <div className="space-y-4">

            <div className="border-l-4 border-blue-500 pl-4">
              Teacher assigned to Class 10-A
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              New subject added
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              Room A-12 marked available
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              Timetable updated successfully
            </div>

          </div>

        </div>

        {/* Room Availability */}
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Room Availability
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between bg-green-50 p-4 rounded-xl">
              <span>Room A-101</span>
              <span className="text-green-600 font-semibold">
                Available
              </span>
            </div>

            <div className="flex justify-between bg-red-50 p-4 rounded-xl">
              <span>Room A-102</span>
              <span className="text-red-600 font-semibold">
                Occupied
              </span>
            </div>

            <div className="flex justify-between bg-green-50 p-4 rounded-xl">
              <span>Room B-201</span>
              <span className="text-green-600 font-semibold">
                Available
              </span>
            </div>

            <div className="flex justify-between bg-yellow-50 p-4 rounded-xl">
              <span>Lab-01</span>
              <span className="text-yellow-600 font-semibold">
                Reserved
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
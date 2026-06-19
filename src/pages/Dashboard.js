import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaBook,
  FaArrowUp,
} from "react-icons/fa";

function Dashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,200",
      icon: <FaUserGraduate />,
      color: "from-blue-600 to-indigo-700",
    },
    {
      title: "Teachers",
      value: "85",
      icon: <FaChalkboardTeacher />,
      color: "from-emerald-500 to-green-700",
    },
    {
      title: "Classes",
      value: "40",
      icon: <FaSchool />,
      color: "from-purple-600 to-fuchsia-700",
    },
    {
      title: "Subjects",
      value: "25",
      icon: <FaBook />,
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6 space-y-8">

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-8 text-white shadow-2xl">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-white/10 rounded-full"></div>

        <div className="relative flex justify-between items-center">
          <div>
            <p className="text-blue-100 font-medium mb-2">
              School Timetable Management System
            </p>

            <h1 className="text-5xl font-extrabold">
              Dashboard
            </h1>

            <p className="text-blue-100 mt-3">
              Welcome back! Manage your school timetable easily.
            </p>
          </div>

          
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden bg-gradient-to-br ${item.color} text-white rounded-[28px] p-6 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300`}
          >
            <div className="absolute -right-6 -top-6 text-8xl opacity-10">
              {item.icon}
            </div>

            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-90">
                  {item.title}
                </p>

                <h2 className="text-4xl font-extrabold mt-3">
                  {item.value}
                </h2>

                <p className="flex items-center gap-2 text-sm mt-4 opacity-90">
                  <FaArrowUp />
                  12% increase
                </p>
              </div>

              <div className="text-3xl bg-white/20 p-4 rounded-2xl">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;
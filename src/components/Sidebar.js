import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaBook,
  FaDoorOpen,
  FaCalendarAlt,
  FaClipboardCheck,
  FaFileAlt,
  FaBell,
  FaCog,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Students", path: "/students", icon: <FaUserGraduate /> },
    { name: "Teachers", path: "/teachers", icon: <FaChalkboardTeacher /> },
    { name: "Classes", path: "/classes", icon: <FaSchool /> },
    { name: "Subjects", path: "/subjects", icon: <FaBook /> },
    { name: "Rooms", path: "/rooms", icon: <FaDoorOpen /> },
    {
      name: "Classroom Availability",
      path: "/classroomavailability",
      icon: <FaCheckCircle />,
    },
    { name: "Staff", path: "/staff", icon: <FaUsers /> },
    { name: "Timetable", path: "/timetable", icon: <FaCalendarAlt /> },
    {
      name: "Timetable Management",
      path: "/timetable-management",
      icon: <FaCalendarAlt />,
    },
    { name: "Attendance", path: "/attendance", icon: <FaClipboardCheck /> },
    { name: "Exams", path: "/exams", icon: <FaFileAlt /> },
    { name: "Events", path: "/events", icon: <FaFileAlt /> },
    { name: "Holidays", path: "/holidays", icon: <FaCalendarAlt /> },
    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white overflow-y-auto">
      <div className="p-6 border-b border-slate-700 sticky top-0 bg-slate-900 z-10">
        <h1 className="text-2xl font-bold text-center text-blue-400">
          School System
        </h1>
      </div>

      <ul className="mt-6 px-3 space-y-2 pb-8">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <li className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 cursor-pointer">
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
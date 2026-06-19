import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const pages = {
    dashboard: "/",
    students: "/Students",
    student: "/Students",
    teachers: "/Teachers",
    teacher: "/Teachers",
    classes: "/Classes",
    class: "/Classes",
    subjects: "/Subjects",
    subject: "/Subjects",
    rooms: "/Rooms",
    room: "/Rooms",
    timetable: "/Timetable",
    attendance: "/Attendance",
    exams: "/Exams",
    exam: "/Exams",
    events: "/Events",
    event: "/Events",
    holidays: "/Holidays",
    holiday: "/Holidays",
    notifications: "/Notifications",
    notification: "/Notifications",
    settings: "/Settings",
    setting: "/Settings",
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const value = search.toLowerCase().trim();

      if (pages[value]) {
        navigate(pages[value]);
        setSearch("");
      } else {
        alert("Page not found");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome Back, Admin 👋</p>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-xl w-96">
        <FaSearch className="text-gray-400" />

        <input
          type="text"
          placeholder="Search page here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          className="bg-transparent outline-none ml-3 w-full"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <Link
          to="/Notifications"
          className="relative text-xl text-gray-600 hover:text-blue-600"
        >
          <FaBell />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </Link>

        {/* Admin Profile Card */}
        <div className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 px-3 py-2 rounded-xl transition"
          >
            <FaUserCircle className="text-4xl text-blue-600" />

            <div>
              <h4 className="font-semibold text-slate-800">Admin</h4>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
          </div>

          {showProfile && (
            <div className="absolute right-0 top-16 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5">
                <h3 className="font-bold text-lg">
                  School Timetable System
                </h3>
                <p className="text-sm opacity-90">Administrator Panel</p>
              </div>

              <div className="p-4">
                <button
                  onClick={logout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
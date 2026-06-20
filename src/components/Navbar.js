import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const pages = {
    dashboard: "/",
    students: "/students",
    student: "/students",
    teachers: "/teachers",
    teacher: "/teachers",
    classes: "/classes",
    class: "/classes",
    subjects: "/subjects",
    subject: "/subjects",
    rooms: "/rooms",
    room: "/rooms",
    timetable: "/timetable",
    attendance: "/attendance",
    exams: "/exams",
    exam: "/exams",
    events: "/events",
    event: "/events",
    holidays: "/holidays",
    holiday: "/holidays",
    notifications: "/notifications",
    notification: "/notifications",
    settings: "/settings",
    setting: "/settings",
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
    <nav className="bg-white border-b border-slate-200 shadow-sm px-10 py-5 min-h-[90px] flex items-center justify-between">
      {/* Left Side */}
      <div>
        <h1 className="text-5xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-base text-slate-700 mt-3">
          Welcome Back, Admin 
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-slate-100 border border-slate-200 px-5 py-3 rounded-2xl w-[500px] focus-within:ring-2 focus-within:ring-blue-500 transition">
          <FaSearch className="text-slate-400 text-lg" />

          <input
            type="text"
            placeholder="Search students, teachers, exams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent outline-none ml-3 w-full text-base text-slate-700"
          />
        </div>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="relative w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition"
        >
          <FaBell className="text-xl" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
            3
          </span>
        </Link>

        {/* Profile */}
        <div className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-2xl cursor-pointer transition"
          >
            <FaUserCircle className="text-5xl text-blue-600" />

            <div>
              <h4 className="font-bold text-base text-slate-800">
                Admin
              </h4>

              <p className="text-sm text-slate-500">
                Administrator
              </p>
            </div>
          </div>

          {showProfile && (
            <div className="absolute right-0 top-16 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5">
                <h3 className="font-bold text-lg">
                  School Timetable System
                </h3>

                <p className="text-sm opacity-90 mt-1">
                  Administrator Panel
                </p>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-5">
                  <FaUserCircle className="text-6xl text-blue-600" />

                  <div>
                    <h4 className="font-bold text-lg text-slate-800">
                      Admin
                    </h4>

                    <p className="text-sm text-slate-500">
                      System Administrator
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
                >
                  <FaSignOutAlt />
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
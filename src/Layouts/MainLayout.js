import { Routes, Route } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Teachers from "../pages/Teachers";
import Classes from "../pages/Classes";
import Subjects from "../pages/Subjects";
import Rooms from "../pages/Rooms";
import Timetable from "../pages/Timetable";
import Attendance from "../pages/Attendance";
import Exams from "../pages/Exams";
import Events from "../pages/Events";
import Holidays from "../pages/Holidays";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import ClassroomAvailability from "../pages/ClassroomAvailability";
import Staff from "../pages/Staff";
import TimetableManagement from "../pages/TimetableManagement";

function MainLayout() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route
              path="/classroomavailability"
              element={<ClassroomAvailability />}
            />
            <Route path="/staff" element={<Staff />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route
              path="/timetable-management"
              element={<TimetableManagement />}
            />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/events" element={<Events />} />
            <Route path="/holidays" element={<Holidays />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
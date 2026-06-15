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

function MainLayout() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Students" element={<Students />} />
            <Route path="/Teachers" element={<Teachers />} />
            <Route path="/Classes" element={<Classes />} />
            <Route path="/Subjects" element={<Subjects />} />
            <Route path="/Rooms" element={<Rooms />} />
            <Route path="/Timetable" element={<Timetable />} />
            <Route path="/Attendance" element={<Attendance />} />
            <Route path="/Exams" element={<Exams />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Holidays" element={<Holidays />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
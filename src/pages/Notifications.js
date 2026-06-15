function Notifications() {
  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Notifications
        </h1>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-xl">
            New Timetable Published
          </div>

          <div className="bg-green-50 p-4 rounded-xl">
            Exam Schedule Updated
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl">
            Holiday Announcement
          </div>
        </div>

      </div>
    </div>
  );
}

export default Notifications;
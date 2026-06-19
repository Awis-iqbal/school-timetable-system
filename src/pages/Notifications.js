import { useEffect, useState } from "react";
import API from "../api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [Title, setTitle] = useState("");
  const [Message, setMessage] = useState("");

  const getNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const saveNotification = async () => {
    if (!Title || !Message) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/notifications", {
        Title,
        Message,
      });

      alert("Notification Added Successfully");

      setTitle("");
      setMessage("");
      setShowForm(false);

      getNotifications();
    } catch (error) {
      console.log("Error saving notification:", error);
      alert("Failed to Add Notification");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">
              Notifications
            </h1>
            <p className="text-slate-500 mt-1">
              Manage school notifications
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            + Add Notification
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.NotificationID}
              className="bg-blue-50 border border-blue-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h2 className="font-bold text-xl text-slate-800">
                {notification.Title}
              </h2>

              <p className="text-slate-600 mt-2">
                {notification.Message}
              </p>

              <p className="text-xs text-slate-400 mt-3">
                {notification.CreatedAt
                  ? new Date(notification.CreatedAt).toLocaleDateString()
                  : "No Date"}
              </p>
            </div>
          ))}

          {notifications.length === 0 && (
            <p className="text-center text-slate-500 py-8">
              No notifications found
            </p>
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[450px] shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Add Notification
              </h2>

              <input
                type="text"
                placeholder="Title"
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Message"
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                rows="4"
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-slate-500 text-white px-5 py-2 rounded-xl hover:bg-slate-600"
                >
                  Cancel
                </button>

                <button
                  onClick={saveNotification}
                  className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
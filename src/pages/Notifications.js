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
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const saveNotification = async () => {
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
      console.log(error);
      alert("Failed to Add Notification");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl shadow">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Add Notification
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.NotificationID}
              className="bg-blue-50 p-4 rounded-xl"
            >
              <h2 className="font-bold text-lg">
                {notification.Title}
              </h2>

              <p className="text-gray-600 mt-2">
                {notification.Message}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(
                  notification.CreatedAt
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-[450px]">

              <h2 className="text-xl font-bold mb-4">
                Add Notification
              </h2>

              <input
                type="text"
                placeholder="Title"
                className="border p-2 w-full mb-3"
                value={Title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

              <textarea
                placeholder="Message"
                className="border p-2 w-full mb-3"
                rows="4"
                value={Message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />

              <div className="flex justify-between">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={saveNotification}
                  className="bg-green-600 text-white px-4 py-2 rounded"
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
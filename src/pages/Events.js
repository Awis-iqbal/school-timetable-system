import { useEffect, useState } from "react";
import API from "../api";

function Events() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [EventName, setEventName] = useState("");
  const [EventDate, setEventDate] = useState("");
  const [Description, setDescription] = useState("");

  const getEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const saveEvent = async () => {
    try {
      await API.post("/events", {
        EventName,
        EventDate,
        Description,
      });

      alert("Event Added Successfully");

      setEventName("");
      setEventDate("");
      setDescription("");
      setShowForm(false);

      getEvents();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Event");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl shadow">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Events
          </h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Add Event
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {events.map((event) => (
            <div
              key={event.EventID}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow"
            >
              <h2 className="font-bold text-lg">
                {event.EventName}
              </h2>

              <p className="mt-2 text-sm">
                {event.Description}
              </p>

              <p className="mt-2 text-xs opacity-80">
                {new Date(event.EventDate).toDateString()}
              </p>
            </div>
          ))}

        </div>

        {/* FORM */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-[400px]">

              <h2 className="text-xl font-bold mb-4">
                Add Event
              </h2>

              <input
                type="text"
                placeholder="Event Name"
                className="border p-2 w-full mb-3"
                value={EventName}
                onChange={(e) => setEventName(e.target.value)}
              />

              <input
                type="date"
                className="border p-2 w-full mb-3"
                value={EventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />

              <textarea
                placeholder="Description"
                className="border p-2 w-full mb-3"
                rows="4"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="flex justify-between">

                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={saveEvent}
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

export default Events;
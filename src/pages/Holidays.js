import { useEffect, useState } from "react";
import API from "../api";

function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [HolidayName, setHolidayName] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  const getHolidays = async () => {
    try {
      const res = await API.get("/holidays");
      setHolidays(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHolidays();
  }, []);

  const saveHoliday = async () => {
    try {
      await API.post("/holidays", {
        HolidayName,
        StartDate,
        EndDate,
      });

      alert("Holiday Added Successfully");

      setHolidayName("");
      setStartDate("");
      setEndDate("");
      setShowForm(false);

      getHolidays();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Holiday");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Holidays
          </h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Add Holiday
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {holidays.map((holiday) => (
            <div
              key={holiday.HolidayID}
              className="bg-white border p-6 rounded-2xl shadow hover:shadow-xl"
            >
              <h2 className="font-bold text-xl">
                {holiday.HolidayName}
              </h2>

              <p className="text-gray-500 mt-2">
                Start: {holiday.StartDate?.split("T")[0]}
              </p>

              <p className="text-gray-500">
                End: {holiday.EndDate?.split("T")[0]}
              </p>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-[400px]">
              <h2 className="text-xl font-bold mb-4">
                Add Holiday
              </h2>

              <input
                type="text"
                placeholder="Holiday Name"
                className="border p-2 w-full mb-3"
                value={HolidayName}
                onChange={(e) =>
                  setHolidayName(e.target.value)
                }
              />

              <input
                type="date"
                className="border p-2 w-full mb-3"
                value={StartDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
              />

              <input
                type="date"
                className="border p-2 w-full mb-3"
                value={EndDate}
                onChange={(e) =>
                  setEndDate(e.target.value)
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
                  onClick={saveHoliday}
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

export default Holidays;
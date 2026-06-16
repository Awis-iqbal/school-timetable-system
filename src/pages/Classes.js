import { useEffect, useState } from "react";
import API from "../api";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [ClassName, setClassName] = useState("");
  const [Section, setSection] = useState("");
  const [Capacity, setCapacity] = useState("");

  const getClasses = async () => {
    try {
      const res = await API.get("/classes");
      setClasses(res.data);
    } catch (error) {
      console.log("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  const saveClass = async () => {
    try {
      await API.post("/classes", {
        ClassName,
        Section,
        Capacity,
      });

      alert("Class Added Successfully");

      setClassName("");
      setSection("");
      setCapacity("");
      setShowForm(false);

      getClasses();
    } catch (error) {
      console.log("Error saving class:", error);
      alert("Failed to add class");
    }
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Classes</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
        >
          Add Class
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {classes.map((item) => (
          <div
            key={item.ClassID}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold">
              {item.ClassName}
            </h2>

            <p className="text-gray-500 mt-2">
              Section: {item.Section}
            </p>

            <p className="text-gray-500">
              Capacity: {item.Capacity}
            </p>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Add Class
            </h2>

            <input
              className="border p-2 w-full mb-3"
              placeholder="Class Name"
              value={ClassName}
              onChange={(e) => setClassName(e.target.value)}
            />

            <input
              className="border p-2 w-full mb-3"
              placeholder="Section"
              value={Section}
              onChange={(e) => setSection(e.target.value)}
            />

            <input
              type="number"
              className="border p-2 w-full mb-3"
              placeholder="Capacity"
              value={Capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />

            <div className="flex justify-between">

              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveClass}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Classes;
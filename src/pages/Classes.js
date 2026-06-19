import { useEffect, useState } from "react";
import API from "../api";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

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

  const filteredClasses = classes.filter((item) =>
    `${item.ClassID} ${item.ClassName} ${item.Section} ${item.Capacity}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800">
              Classes
            </h1>
            <p className="text-slate-500 mt-1">
              Manage all class records
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Add Class
          </button>
        </div>

        <input
          type="text"
          placeholder="Search Class..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 p-4 rounded-2xl mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {filteredClasses.map((item) => (
            <div
              key={item.ClassID}
              className="relative overflow-hidden bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

              <div className="flex justify-center -mt-10">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center border-4 border-white">
                  <span className="text-3xl font-extrabold text-blue-700">
                    {item.ClassName?.charAt(0)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-center text-2xl font-bold text-slate-800">
                  {item.ClassName}
                </h2>

                <div className="flex justify-center mt-3">
                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                    Section {item.Section}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-100">
                    <p className="text-xs text-slate-400">Class ID</p>
                    <p className="text-xl font-bold text-blue-700">
                      {item.ClassID}
                    </p>
                  </div>

                  <div className="bg-indigo-50 rounded-2xl p-4 text-center border border-indigo-100">
                    <p className="text-xs text-slate-400">Capacity</p>
                    <p className="text-xl font-bold text-indigo-700">
                      {item.Capacity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredClasses.length === 0 && (
            <div className="col-span-full text-center py-10 text-slate-500">
              No Classes Found
            </div>
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[400px] shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">
                Add Class
              </h2>

              <input
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Class Name"
                value={ClassName}
                onChange={(e) => setClassName(e.target.value)}
              />

              <input
                className="border border-slate-300 p-3 w-full mb-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Section"
                value={Section}
                onChange={(e) => setSection(e.target.value)}
              />

              <input
                type="number"
                className="border border-slate-300 p-3 w-full mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Capacity"
                value={Capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-slate-500 text-white px-5 py-2 rounded-xl hover:bg-slate-600"
                >
                  Cancel
                </button>

                <button
                  onClick={saveClass}
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

export default Classes;
import { useEffect, useState } from "react";
import API from "../api";

function Settings() {
  const [user, setUser] = useState({
    FullName: "",
    Email: "",
    Password: "",
  });

  const getUser = async () => {
    try {
      const res = await API.get("/settings");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveSettings = async () => {
    try {
      await API.put("/settings", user);
      alert("Settings Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update settings");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl shadow max-w-2xl">

        <h1 className="text-3xl font-bold mb-6">
          Settings
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            name="FullName"
            placeholder="Full Name"
            className="w-full border p-3 rounded-xl"
            value={user.FullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="Email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            value={user.Email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="Password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
            value={user.Password}
            onChange={handleChange}
          />

          <button
            onClick={saveSettings}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}

export default Settings;
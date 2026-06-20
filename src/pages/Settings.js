import { useEffect, useState } from "react";
import API from "../api";
import {
  FaEye,
  FaEyeSlash,
  FaUserCog,
  FaEnvelope,
  FaLock,
  FaSave,
  FaUndo,
} from "react-icons/fa";

function Settings() {
  const [user, setUser] = useState({
    FullName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [originalUser, setOriginalUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await API.get("/settings");

      const userData = {
        FullName: res.data?.FullName || "",
        Email: res.data?.Email || "",
        Password: res.data?.Password || "",
        ConfirmPassword: res.data?.Password || "",
      };

      setUser(userData);
      setOriginalUser(userData);
    } catch (error) {
      console.log("GET SETTINGS ERROR:", error.response?.data || error.message);
      alert(
        error.response?.data?.sqlMessage ||
          error.response?.data?.message ||
          "Failed to load settings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const resetChanges = () => {
    if (originalUser) {
      setUser(originalUser);
    }
  };

  const saveSettings = async () => {
    if (!user.FullName.trim()) {
      alert("Full name is required");
      return;
    }

    if (!user.Email.trim()) {
      alert("Email is required");
      return;
    }

    if (!user.Password.trim()) {
      alert("Password is required");
      return;
    }

    if (user.Password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (user.Password !== user.ConfirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      setLoading(true);

      await API.put("/settings", {
        FullName: user.FullName,
        Email: user.Email,
        Password: user.Password,
      });

      alert("Settings Updated Successfully");

      const updatedUser = {
        ...user,
        ConfirmPassword: user.Password,
      };

      setOriginalUser(updatedUser);
    } catch (error) {
      console.log("PUT SETTINGS FULL ERROR:", error);
      console.log("PUT SETTINGS BACKEND:", error.response?.data);

      alert(
        error.response?.data?.sqlMessage ||
          error.response?.data?.message ||
          error.message ||
          "Failed to update settings"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Settings
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Manage your admin profile and account password
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-7 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaUserCog className="text-3xl" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Admin Account Settings
                </h2>
                <p className="text-blue-100 mt-1">
                  Update your personal information securely
                </p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-8 space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Full Name
              </label>

              <div className="flex items-center border border-slate-300 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaUserCog className="text-slate-400 text-lg" />

                <input
                  type="text"
                  name="FullName"
                  placeholder="Enter full name"
                  className="w-full outline-none ml-3 text-slate-700 text-base"
                  value={user.FullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Email Address
              </label>

              <div className="flex items-center border border-slate-300 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaEnvelope className="text-slate-400 text-lg" />

                <input
                  type="email"
                  name="Email"
                  placeholder="Enter email address"
                  className="w-full outline-none ml-3 text-slate-700 text-base"
                  value={user.Email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Password
              </label>

              <div className="flex items-center border border-slate-300 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaLock className="text-slate-400 text-lg" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  placeholder="Enter password"
                  className="w-full outline-none ml-3 text-slate-700 text-base"
                  value={user.Password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-blue-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Confirm Password
              </label>

              <div className="flex items-center border border-slate-300 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaLock className="text-slate-400 text-lg" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="ConfirmPassword"
                  placeholder="Confirm password"
                  className="w-full outline-none ml-3 text-slate-700 text-base"
                  value={user.ConfirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="text-slate-500 hover:text-blue-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {user.Password &&
                user.ConfirmPassword &&
                user.Password !== user.ConfirmPassword && (
                  <p className="text-red-500 text-sm mt-2">
                    Passwords do not match
                  </p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={saveSettings}
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-7 py-3 rounded-2xl font-semibold transition"
              >
                <FaSave />
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={resetChanges}
                disabled={loading}
                className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-7 py-3 rounded-2xl font-semibold transition"
              >
                <FaUndo />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
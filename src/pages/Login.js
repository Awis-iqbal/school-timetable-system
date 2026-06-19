import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!Email || !Password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        Email,
        Password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center">
      <div className="bg-white w-[420px] p-8 rounded-3xl shadow-2xl border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Admin Login</h1>
          <p className="text-slate-500 mt-2">
            School Timetable Management System
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
import {
  FaSearch,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Welcome Back, Admin 👋
        </p>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-xl w-96">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search here..."
          className="bg-transparent outline-none ml-3 w-full"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative text-xl text-gray-600 hover:text-blue-600">
          <FaBell />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">

          <FaUserCircle className="text-4xl text-blue-600" />

          <div>
            <h4 className="font-semibold text-slate-800">
              Admin
            </h4>

            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
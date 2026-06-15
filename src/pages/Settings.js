function Settings() {
  return (
    <div className="p-6">

      <div className="bg-white p-6 rounded-2xl shadow max-w-2xl">

        <h1 className="text-3xl font-bold mb-6">
          Settings
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;
function Classes() {
  const classes = ["9th A", "9th B", "10th A", "10th B", "ICS Part 1"];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Classes</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {classes.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl"
          >
            <h2 className="text-xl font-bold">{item}</h2>
            <p className="text-gray-500 mt-2">
              40 Students
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classes;
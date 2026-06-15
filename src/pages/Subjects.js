function Subjects() {
  const subjects = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "English",
    "Urdu",
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Subjects</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="font-bold text-xl">
              {subject}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subjects;
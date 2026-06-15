function Teachers() {
  const teachers = [
    { id: 1, name: "Ahmed Khan", subject: "Computer Science" },
    { id: 2, name: "Sara Ali", subject: "Mathematics" },
    { id: 3, name: "Usman", subject: "Physics" },
  ];

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Teachers</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
            Add Teacher
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-slate-100 p-5 rounded-xl hover:shadow-lg"
            >
              <img
                src="https://i.pravatar.cc/150"
                alt=""
                className="w-20 h-20 rounded-full mx-auto"
              />
              <h3 className="text-center font-bold mt-3">
                {teacher.name}
              </h3>
              <p className="text-center text-gray-500">
                {teacher.subject}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teachers;
import React, { useEffect, useState } from "react";
import API from "../api";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.log("Error fetching students:", err);
    }
  };

  return (
    <div>
      <h2>Students List</h2>

      {students.map((stu) => (
        <div key={stu.id}>
          {stu.name}
        </div>
      ))}
    </div>
  );
};

export default Students;
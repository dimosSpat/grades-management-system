import { useEffect, useState } from "react";

import { createCourse } from "../../api/courseApi";
import { getSemesters } from "../../api/semesterApi";

function CourseForm({ onCourseCreated }) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    credits: "",
    status: "active",
    semesterId: "",
  });

  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    loadSemesters();
  }, []);

  async function loadSemesters() {
   try {
    const response = await getSemesters();

    setSemesters(response);
   } catch (error) {
     console.error("Failed to load semesters:", error);
    }
  } 

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.code ||
      !formData.name ||
      !formData.credits ||
      !formData.semesterId
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await createCourse({
        ...formData,
        credits: Number(formData.credits),
        semesterId: Number(formData.semesterId),
      });

      setFormData({
        code: "",
        name: "",
        credits: "",
        status: "active",
        semesterId: "",
      });

      onCourseCreated();
    } catch (error) {
      console.error("Failed to create course:", error);
      alert("Failed to create course.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Course</h3>

      <input
        type="text"
        name="code"
        placeholder="Course Code"
        value={formData.code}
        onChange={handleChange}
      />

      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="number"
        name="credits"
        placeholder="Credits"
        value={formData.credits}
        onChange={handleChange}
      />

      <select
        name="semesterId"
        value={formData.semesterId}
        onChange={handleChange}
      >
        <option value="">Select Semester</option>

        {semesters.map((semester) => (
          <option
            key={semester.id}
            value={semester.id}
          >
            {semester.name}
          </option>
        ))}
      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="planned">Planned</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <button type="submit">
        Add Course
      </button>
    </form>
  );
}

export default CourseForm;
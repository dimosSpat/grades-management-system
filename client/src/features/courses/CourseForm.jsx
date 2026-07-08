import { useEffect, useState } from "react";
import { getSemesters } from "../../api/semesterApi";
import { createCourse, updateCourse } from "../../api/courseApi";

function CourseForm({
  onCourseCreated,
  editingCourse,
  setEditingCourse,
  }) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    credits: "",
    status: "PLANNED",
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

  useEffect(() => {
  if (editingCourse) {
    setFormData({
      code: editingCourse.code,
      name: editingCourse.name,
      credits: editingCourse.credits,
      semesterId: editingCourse.semesterId,
      status: editingCourse.status,
        });
      }
    }, [editingCourse]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
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
        const payload = {
          ...formData,
          credits: Number(formData.credits),
          semesterId: Number(formData.semesterId),
        };

        if (editingCourse) {
          await updateCourse(editingCourse.id, payload);
        } else {
          await createCourse(payload);
        }

        setFormData({
          code: "",
          name: "",
          credits: "",
          status: "PLANNED",
          semesterId: "",
        });

        setEditingCourse(null);

        onCourseCreated();
      } catch (error) {
        console.error(error);
        alert("Failed to save course.");
      }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>
         {editingCourse ? "Edit Course" : "Add Course"}    
     </h3>

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
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="DROPPED">Dropped</option>
      </select>

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

      <button type="submit">
        {editingCourse ? "Update Course" : "Add Course"}
      </button>

      {editingCourse && (
        <button
          type="button"
          onClick={() => {
            setEditingCourse(null);

            setFormData({
              code: "",
              name: "",
              credits: "",
              status: "PLANNED",
              semesterId: "",
            });
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default CourseForm;
import { useEffect, useState } from "react";

function GradeForm({
  grade,
  courses,
  onSave,
  onCancel,
}) {
  const [value, setValue] = useState("");
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    if (grade) {
      setValue(grade.value);
      setCourseId(grade.courseId);
    } else {
      setValue("");
      setCourseId("");
    }
  }, [grade]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      value: Number(value),
      courseId: Number(courseId),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Course</label>

        <select
          value={courseId}
          onChange={(e) =>
            setCourseId(e.target.value)
          }
          disabled={!!grade}
          required
        >
          <option value="">Select a course</option>

          {courses.map((course) => (
            <option
              key={course.id}
              value={course.id}
            >
              {course.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Grade</label>

        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          required
        />
      </div>

      <button type="submit">
        {grade ? "Update Grade" : "Add Grade"}
      </button>

      <button
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}

export default GradeForm;
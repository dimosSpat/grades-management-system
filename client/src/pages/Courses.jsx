import { useEffect, useState } from "react";
import { getCourses } from "../api/courseApi";
import CourseTable from "../features/courses/CourseTable";
import CourseForm from "../features/courses/CourseForm";
import { deleteCourse } from "../api/courseApi";


function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const courses = await getCourses();
      setCourses(courses);
    } catch (error) {
      console.error("Failed to load courses:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCourse(id);

      await loadCourses();   // <-- notice the await
    } catch (error) {
      console.error(error);
      alert("Failed to delete course.");
    }
  }

  if (loading) {
    return (
      <main className="content">
        <h2>Loading courses...</h2>
      </main>
    );
  }

  return (
    <main className="content">
      <h2>Courses</h2>

      <CourseForm
        onCourseCreated={loadCourses}
        editingCourse={editingCourse}
        setEditingCourse={setEditingCourse}
      />

      <CourseTable
        courses={courses}
        onDelete={handleDelete}
        onEdit={setEditingCourse}
      />
    </main>
  );
}


export default Courses;
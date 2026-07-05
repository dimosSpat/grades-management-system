import { useEffect, useState } from "react";

import { getCourses } from "../api/courseApi";

import CourseTable from "../features/courses/CourseTable";

import CourseForm from "../features/courses/CourseForm";

function Courses() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const response = await getCourses();

      setCourses(response.data);
    } catch (error) {
      console.error("Failed to load courses:", error);
    } finally {
      setLoading(false);
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

    <CourseForm onCourseCreated={loadCourses} />

    <CourseTable courses={courses} />
  </main>
  );
}

export default Courses;
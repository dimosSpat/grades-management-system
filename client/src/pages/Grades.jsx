import "../styles/grades.css";
import { useEffect, useState } from "react";
import {
  getGrades,
  createGrade,
  updateGrade,
  deleteGrade,
} from "../api/gradeApi";
import { getCourses } from "../api/courseApi";
import GradeTable from "../features/grades/GradeTable";
import GradeForm from "../features/grades/GradeForm";
import "../styles/grades.css";

function Grades() {
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [gradesData, coursesData] = await Promise.all([
        getGrades(),
        getCourses(),
      ]);

      setGrades(gradesData);
      setCourses(coursesData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (grade) => {
    setEditingGrade(grade);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingGrade(null);
    setShowForm(false);
  };

  const handleSave = async (gradeData) => {
    try {
      if (editingGrade) {
        await updateGrade(editingGrade.id, gradeData);
      } else {
        await createGrade(gradeData);
      }

      await loadData();

      setEditingGrade(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving grade:", error);
    }
  };

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this grade?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteGrade(id);

    await loadData();
  } catch (error) {
    console.error("Error deleting grade:", error);
    alert("Failed to delete grade.");
   }
  };

  if (loading) {
    return <p>Loading grades...</p>;
  }

  return (
    <div className="grades-page">
      <h1>Grades</h1>

      {!showForm && (
        <button onClick={() => setShowForm(true)}>
          Add Grade
        </button>
      )}

      {showForm && (
        <GradeForm
          grade={editingGrade}
          courses={courses}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <GradeTable
        grades={grades}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Grades;
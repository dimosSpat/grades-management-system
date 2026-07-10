import "../styles/semesters.css";
import { useEffect, useState } from "react";
import {
  getSemesters,
  createSemester,
  updateSemester,
  deleteSemester,
} from "../api/semesterApi";
import SemesterTable from "../features/semesters/SemesterTable";
import SemesterForm from "../features/semesters/SemesterForm";
import "../styles/semesters.css";

function Semesters() {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingSemester, setEditingSemester] = useState(null);

  useEffect(() => {
    loadSemesters();
  }, []);

  const loadSemesters = async () => {
    try {
      const data = await getSemesters();
      setSemesters(data);
    } catch (error) {
      console.error("Error loading semesters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (semester) => {
    setEditingSemester(semester);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingSemester(null);
    setShowForm(false);
  };

  const handleSave = async (semesterData) => {
    try {
      if (editingSemester) {
        await updateSemester(editingSemester.id, semesterData);
      } else {
        await createSemester(semesterData);
      }

      await loadSemesters();

      setEditingSemester(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving semester:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this semester?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteSemester(id);
      await loadSemesters();
    } catch (error) {
      console.error("Error deleting semester:", error);
      alert("Failed to delete semester.");
    }
  };

  if (loading) {
    return <p>Loading semesters...</p>;
  }

  return (
    <div className="semesters-page">
      <h1>Semesters</h1>

      {!showForm && (
        <button onClick={() => setShowForm(true)}>
          Add Semester
        </button>
      )}

      {showForm && (
        <SemesterForm
          semester={editingSemester}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <SemesterTable
        semesters={semesters}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Semesters;
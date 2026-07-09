function GradeTable({ grades, onEdit, onDelete }) {
  if (grades.length === 0) {
    return <p>No grades found.</p>;
  }

  return (
    <table className="grade-table">
      <thead>
        <tr>
          <th>Course</th>
          <th>Grade</th>
          <th>Passed</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {grades.map((grade) => (
          <tr key={grade.id}>
            <td>{grade.course?.name}</td>

            <td>{grade.value}</td>

            <td>{grade.passed ? "✅" : "❌"}</td>

            <td>
              <button onClick={() => onEdit(grade)}>
                Edit
              </button>

              <button onClick={() => onDelete(grade.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GradeTable;
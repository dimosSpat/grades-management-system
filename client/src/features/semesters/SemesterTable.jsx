function SemesterTable({
  semesters,
  onEdit,
  onDelete,
}) {
  if (semesters.length === 0) {
    return <p>No semesters found.</p>;
  }

  return (
    <table className="semester-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {semesters.map((semester) => (
          <tr key={semester.id}>
            <td>{semester.name}</td>

            <td>
              {new Date(
                semester.startDate
              ).toLocaleDateString()}
            </td>

            <td>
              {new Date(
                semester.endDate
              ).toLocaleDateString()}
            </td>

            <td>
              <button
                onClick={() => onEdit(semester)}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  onDelete(semester.id)
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SemesterTable;
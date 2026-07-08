function CourseTable({ courses, onDelete, onEdit, }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Credits</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td>{course.code}</td>
            <td>{course.name}</td>
            <td>{course.credits}</td>
            <td>{course.status}</td>
            <td>
              <button
                onClick={() => onEdit(course)}
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(course.id)}
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

export default CourseTable;
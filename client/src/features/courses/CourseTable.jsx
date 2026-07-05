function CourseTable({ courses }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Credits</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td>{course.code}</td>
            <td>{course.name}</td>
            <td>{course.credits}</td>
            <td>{course.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CourseTable;
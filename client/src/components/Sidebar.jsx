import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/semesters">Semesters</NavLink>
        </li>

        <li>
          <NavLink to="/courses">Courses</NavLink>
        </li>

        <li>
          <NavLink to="/grades">Grades</NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <ul>
        <li>
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/semesters">
            Semesters
          </NavLink>
        </li>

        <li>
          <NavLink to="/courses">
            Courses
          </NavLink>
        </li>

        <li>
          <NavLink to="/grades">
            Grades
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-user">
        <p>
          Welcome, {user?.username}
        </p>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
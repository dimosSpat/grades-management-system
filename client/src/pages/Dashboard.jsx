import { useEffect, useState } from "react";

import { getDashboardStats } from "../api/dashboardApi";

function Dashboard() {
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="content">
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main className="content">
      <h2>Dashboard</h2>

      <hr />

      <br />

      <p>Total Semesters: {stats.totalSemesters}</p>

      <p>Total Courses: {stats.totalCourses}</p>

      <p>Completed Courses: {stats.completedCourses}</p>

      <p>Average Grade: {stats.averageGrade}</p>

      <p>GPA: {stats.gpa}</p>

      <p>Earned Credits: {stats.earnedCredits}</p>
    </main>
  );
}

export default Dashboard;
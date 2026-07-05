import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Semesters from "./pages/Semesters";
import Grades from "./pages/Grades";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/courses" element={<Courses />} />

          <Route path="/semesters" element={<Semesters />} />

          <Route path="/grades" element={<Grades />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
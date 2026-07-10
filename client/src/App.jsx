import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Semesters from "./pages/Semesters";
import Grades from "./pages/Grades";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

          <Route
                path="/courses"
                element={
                  <ProtectedRoute>
                    <Courses />
                  </ProtectedRoute>
                }
              />

          <Route
                path="/semesters"
                element={
                  <ProtectedRoute>
                    <Semesters />
                  </ProtectedRoute>
                }
              />
          <Route
                path="/grades"
                element={
                  <ProtectedRoute>
                    <Grades />
                  </ProtectedRoute>
                }
              />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
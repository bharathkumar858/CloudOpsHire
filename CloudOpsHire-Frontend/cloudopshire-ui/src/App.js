import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import store from "./store";

import Navbar from "./components/layout/Navbar";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import JobsPage from "./pages/jobs/JobsPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";

import CandidateDashboard from "./pages/candidate/Dashboard";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import PostJobPage from "./pages/recruiter/PostJobPage";
import EditJobPage from "./pages/recruiter/EditJobPage";

import AdminDashboard from "./pages/admin/AdminDashboard";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector((s) => s.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppRoutes() {
  const { user } = useSelector((s) => s.auth);

  const home = !user
    ? "/login"
    : user.role === "ADMIN"
      ? "/admin"
      : user.role === "RECRUITER"
        ? "/recruiter"
        : "/dashboard";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Routes>
        {/* Home Redirect */}
        <Route path="/" element={<Navigate to={home} replace />} />

        {/* Auth */}
        <Route
          path="/login"
          element={user ? <Navigate to={home} replace /> : <LoginPage />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to={home} replace /> : <RegisterPage />}
        />

        {/* Jobs */}
        <Route path="/jobs" element={<JobsPage />} />

        <Route path="/jobs/:id" element={<JobDetailPage />} />

        {/* Candidate */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["CANDIDATE"]}>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        {/* Recruiter */}
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/post-job"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <PostJobPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/edit-job/:id"
          element={
            <ProtectedRoute allowedRoles={["RECRUITER"]}>
              <EditJobPage />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={home} replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
          }}
        />
      </BrowserRouter>
    </Provider>
  );
}

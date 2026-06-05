import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((s) => s.auth);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-primary-600 font-semibold"
      : "text-gray-600 hover:text-primary-600";

  const dashboardPath =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "RECRUITER"
        ? "/recruiter"
        : "/dashboard";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 bg-primary-600 rounded-lg flex items-center
                            justify-center text-white font-bold text-sm"
            >
              C
            </div>
            <span className="text-xl font-bold text-primary-700">
              CloudOpsHire
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/jobs"
              className={`text-sm font-medium transition-colors ${isActive("/jobs")}`}
            >
              Browse Jobs
            </Link>
            {user && (
              <Link
                to={dashboardPath}
                className={`text-sm font-medium transition-colors ${isActive(dashboardPath)}`}
              >
                Dashboard
              </Link>
            )}
            {user?.role === "RECRUITER" && (
              <Link
                to="/recruiter/post-job"
                className={`text-sm font-medium transition-colors ${isActive("/recruiter/post-job")}`}
              >
                Post a Job
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <span
                  className={`badge text-xs ${
                    user.role === "ADMIN"
                      ? "badge-red"
                      : user.role === "RECRUITER"
                        ? "badge-purple"
                        : "badge-blue"
                  }`}
                >
                  {user.role}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm px-3 py-1.5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn-secondary text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-3 space-y-2 border-t border-gray-100">
            <Link
              to="/jobs"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
            >
              Browse Jobs
            </Link>
            {user && (
              <Link
                to={dashboardPath}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-sm
                                 text-red-600 hover:bg-red-50 rounded"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-2 px-3 pt-2">
                <Link
                  to="/login"
                  className="btn-secondary text-sm flex-1 text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary  text-sm flex-1 text-center"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import applicationService from "../../services/applicationService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DEMO_APPLICATIONS = [
  {
    id: 1,
    jobTitle: "Senior Java Developer",
    company: "TechCorp",
    status: "UNDER_REVIEW",
    appliedAt: "2026-05-10",
    atsScore: 85,
  },
  {
    id: 2,
    jobTitle: "Backend Engineer",
    company: "DataFlow",
    status: "SHORTLISTED",
    appliedAt: "2026-05-09",
    atsScore: 91,
  },
  {
    id: 3,
    jobTitle: "Full Stack Developer",
    company: "InnovateTech",
    status: "APPLIED",
    appliedAt: "2026-05-12",
    atsScore: 78,
  },
  {
    id: 4,
    jobTitle: "DevOps Engineer",
    company: "CloudSystems",
    status: "INTERVIEW_SCHEDULED",
    appliedAt: "2026-05-08",
    atsScore: 88,
  },
  {
    id: 5,
    jobTitle: "React Developer",
    company: "StartupXYZ",
    status: "REJECTED",
    appliedAt: "2026-05-05",
    atsScore: 62,
  },
];

const ACTIVITY_DATA = [
  { day: "Mon", applications: 2 },
  { day: "Tue", applications: 1 },
  { day: "Wed", applications: 3 },
  { day: "Thu", applications: 0 },
  { day: "Fri", applications: 2 },
  { day: "Sat", applications: 1 },
  { day: "Sun", applications: 0 },
];

const STATUS_PIE = [
  { name: "Applied", value: 1, color: "#93c5fd" },
  { name: "Reviewing", value: 1, color: "#fbbf24" },
  { name: "Shortlisted", value: 1, color: "#34d399" },
  { name: "Interview", value: 1, color: "#818cf8" },
  { name: "Rejected", value: 1, color: "#f87171" },
];

const statusConfig = {
  APPLIED: { label: "Applied", cls: "badge-blue" },
  UNDER_REVIEW: { label: "Under Review", cls: "badge-yellow" },
  SHORTLISTED: { label: "Shortlisted", cls: "badge-green" },
  INTERVIEW_SCHEDULED: { label: "Interview", cls: "badge-purple" },
  OFFER_EXTENDED: { label: "Offer", cls: "badge-green" },
  HIRED: { label: "Hired 🎉", cls: "badge-green" },
  REJECTED: { label: "Rejected", cls: "badge-red" },
  WITHDRAWN: { label: "Withdrawn", cls: "badge-gray" },
};

function StatCard({ label, value, icon, color }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center
                         ${color.replace("text-", "bg-").replace("600", "100")}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function CandidateDashboard() {
  const { user } = useSelector((s) => s.auth);
  const [applications, setApplications] = useState(DEMO_APPLICATIONS);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadApplications() {
      if (!user?.userId) return;

      try {
        const data = await applicationService.getMyApplications(user.userId);
        if (!ignore) {
          setApplications(Array.isArray(data) ? data : []);
          setUsingFallback(false);
        }
      } catch {
        if (!ignore) {
          setApplications(DEMO_APPLICATIONS);
          setUsingFallback(true);
        }
      }
    }

    loadApplications();
    return () => {
      ignore = true;
    };
  }, [user?.userId]);

  const total = applications.length;
  const interviews = applications.filter(
    (a) => a.status === "INTERVIEW_SCHEDULED",
  ).length;
  const shortlisted = applications.filter(
    (a) => a.status === "SHORTLISTED",
  ).length;
  const avgAts = Math.round(
    total ? applications.reduce((s, a) => s + (a.atsScore || 0), 0) / total : 0,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome banner */}
      <div
        className="bg-gradient-to-r from-primary-600 to-primary-800
                      rounded-2xl p-8 text-white mb-8 relative overflow-hidden"
      >
        <div
          className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5
                        rounded-full -translate-y-1/2 translate-x-1/2"
        />
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-primary-100 mt-1 text-sm">
          You have {interviews} interview{interviews !== 1 ? "s" : ""}{" "}
          scheduled. Keep it up!
        </p>
        {usingFallback && (
          <p className="text-primary-100 mt-1 text-xs">
            Showing demo data because application-service is offline.
          </p>
        )}
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 mt-4 bg-white
                         text-primary-700 px-4 py-2 rounded-lg text-sm font-medium
                         hover:bg-primary-50 transition-colors"
        >
          Browse Jobs
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Applied"
          value={total}
          color="text-blue-600"
          icon={
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0
                           002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0
                           002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
        />
        <StatCard
          label="Shortlisted"
          value={shortlisted}
          color="text-green-600"
          icon={
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          label="Interviews"
          value={interviews}
          color="text-purple-600"
          icon={
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2
                           0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <StatCard
          label="Avg ATS Score"
          value={`${avgAts}%`}
          color="text-orange-500"
          icon={
            <svg
              className="w-6 h-6 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          }
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 card">
          <h2 className="section-title mb-4">Applications This Week</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ACTIVITY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="applications"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h2 className="section-title mb-4">Application Status</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={STATUS_PIE}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {STATUS_PIE.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            {STATUS_PIE.map((s) => (
              <span
                key={s.name}
                className="flex items-center gap-1 text-xs text-gray-500"
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ background: s.color }}
                />
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Applications table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">My Applications</h2>
          <Link to="/jobs" className="btn-primary text-sm py-1.5 px-4">
            + Apply to more jobs
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th
                  className="text-left py-3 px-2 text-xs font-medium
                               text-gray-400 uppercase tracking-wide"
                >
                  Job
                </th>
                <th
                  className="text-left py-3 px-2 text-xs font-medium
                               text-gray-400 uppercase tracking-wide"
                >
                  Company
                </th>
                <th
                  className="text-left py-3 px-2 text-xs font-medium
                               text-gray-400 uppercase tracking-wide"
                >
                  ATS
                </th>
                <th
                  className="text-left py-3 px-2 text-xs font-medium
                               text-gray-400 uppercase tracking-wide"
                >
                  Status
                </th>
                <th
                  className="text-left py-3 px-2 text-xs font-medium
                               text-gray-400 uppercase tracking-wide"
                >
                  Applied
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-2 font-medium text-gray-900">
                    {app.jobTitle}
                  </td>
                  <td className="py-3 px-2 text-gray-500">{app.company}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-16">
                        <div
                          className={`h-1.5 rounded-full ${
                            app.atsScore >= 85
                              ? "bg-green-500"
                              : app.atsScore >= 70
                                ? "bg-yellow-400"
                                : "bg-red-400"
                          }`}
                          style={{ width: `${app.atsScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {app.atsScore}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`badge ${statusConfig[app.status]?.cls}`}>
                      {statusConfig[app.status]?.label}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-400 text-xs">
                    {String(app.appliedAt).slice(0, 10)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import applicationService from "../../services/applicationService";

// IDs must match DEMO_JOBS in JobDetailPage and JobsPage
const DEMO_POSTED_JOBS = [
  {
    id: "1",
    title: "Senior Java Developer",
    applicants: 24,
    status: "ACTIVE",
    views: 342,
    posted: "2026-05-10",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    applicants: 18,
    status: "ACTIVE",
    views: 189,
    posted: "2026-05-09",
  },
  {
    id: "5",
    title: "Backend Engineer - Python",
    applicants: 41,
    status: "PAUSED",
    views: 512,
    posted: "2026-05-01",
  },
];

const DEMO_APPLICANTS = [
  {
    id: 1,
    name: "Rahul Sharma",
    job: "Senior Java Developer",
    atsScore: 91,
    status: "SHORTLISTED",
    appliedAt: "2026-05-12",
  },
  {
    id: 2,
    name: "Priya Patel",
    job: "DevOps Engineer",
    atsScore: 88,
    status: "UNDER_REVIEW",
    appliedAt: "2026-05-11",
  },
  {
    id: 3,
    name: "Amit Kumar",
    job: "Senior Java Developer",
    atsScore: 75,
    status: "APPLIED",
    appliedAt: "2026-05-13",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    job: "DevOps Engineer",
    atsScore: 95,
    status: "INTERVIEW_SCHEDULED",
    appliedAt: "2026-05-10",
  },
];

const statusCls = {
  APPLIED: "badge-blue",
  UNDER_REVIEW: "badge-yellow",
  SHORTLISTED: "badge-green",
  INTERVIEW_SCHEDULED: "badge-purple",
  REJECTED: "badge-red",
};

export default function RecruiterDashboard() {
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [applicants, setApplicants] = useState(DEMO_APPLICANTS);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadApplicants() {
      if (!user?.userId) return;

      try {
        const data = await applicationService.getRecruiterApplications(user.userId);
        if (!ignore) {
          setApplicants(
            Array.isArray(data)
              ? data.map((app) => ({
                  ...app,
                  name: app.candidateName || app.candidateEmail || "Candidate",
                  job: app.jobTitle,
                  appliedAt: String(app.appliedAt).slice(0, 10),
                }))
              : [],
          );
          setUsingFallback(false);
        }
      } catch {
        if (!ignore) {
          setApplicants(DEMO_APPLICANTS);
          setUsingFallback(true);
        }
      }
    }

    loadApplicants();
    return () => {
      ignore = true;
    };
  }, [user?.userId]);

  const handleStatusChange = async (id, newStatus) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
    );

    if (!usingFallback) {
      try {
        await applicationService.updateStatus(id, newStatus);
      } catch {
        setApplicants((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: "APPLIED" } : a)),
        );
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title">Recruiter Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome, {user?.firstName}. Manage your job postings.
          </p>
          {usingFallback && (
            <p className="text-gray-400 text-xs mt-1">
              Showing demo applicants because application-service is offline.
            </p>
          )}
        </div>
        <Link to="/recruiter/post-job" className="btn-primary">
          + Post a Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Jobs", value: 2, color: "text-blue-600" },
          { label: "Total Applicants", value: applicants.length, color: "text-green-600" },
          { label: "Interviews Set", value: 4, color: "text-purple-600" },
          { label: "Positions Filled", value: 1, color: "text-orange-500" },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-gray-500 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {["overview", "applicants"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium capitalize
                              border-b-2 transition-colors ${
                                tab === t
                                  ? "border-primary-600 text-primary-600"
                                  : "border-transparent text-gray-500 hover:text-gray-700"
                              }`}
          >
            {t === "overview" ? "My Job Postings" : "All Applicants"}
          </button>
        ))}
      </div>

      {/* Tab: My Job Postings */}
      {tab === "overview" && (
        <div className="space-y-4">
          {DEMO_POSTED_JOBS.map((job) => (
            <div
              key={job.id}
              className="card flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <span
                    className={`badge ${
                      job.status === "ACTIVE" ? "badge-green" : "badge-yellow"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <div className="flex gap-4 mt-1 text-sm text-gray-500">
                  <span>{job.applicants} applicants</span>
                  <span>{job.views} views</span>
                  <span>Posted {job.posted}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {/* EDIT → goes to edit page */}
                <button
                  onClick={() => navigate(`/recruiter/edit-job/${job.id}`)}
                  className="btn-secondary text-sm py-1.5 px-4"
                >
                  ✏️ Edit
                </button>
                {/* VIEW → goes to job detail */}
                <Link
                  to={`/jobs/${job.id}`}
                  className="btn-primary text-sm py-1.5 px-4"
                >
                  👁 View
                </Link>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {DEMO_POSTED_JOBS.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No jobs posted yet.</p>
              <Link
                to="/recruiter/post-job"
                className="btn-primary mt-4 inline-flex"
              >
                Post your first job
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab: All Applicants */}
      {tab === "applicants" && (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  "Candidate",
                  "Applied For",
                  "ATS Score",
                  "Status",
                  "Date",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-3 text-xs font-medium
                                 text-gray-400 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applicants.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 bg-primary-100 rounded-full flex
                                      items-center justify-center text-primary-700
                                      font-semibold text-sm flex-shrink-0"
                      >
                        {a.name[0]}
                      </div>
                      <span className="font-medium text-gray-900">
                        {a.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-gray-500 text-xs">{a.job}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            a.atsScore >= 85
                              ? "bg-green-500"
                              : a.atsScore >= 70
                                ? "bg-yellow-400"
                                : "bg-red-400"
                          }`}
                          style={{ width: `${a.atsScore}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          a.atsScore >= 85
                            ? "text-green-600"
                            : a.atsScore >= 70
                              ? "text-yellow-500"
                              : "text-red-500"
                        }`}
                      >
                        {a.atsScore}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`badge ${statusCls[a.status]}`}>
                      {a.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-400 text-xs">
                    {a.appliedAt}
                  </td>
                  <td className="py-3 px-3">
                    <select
                      value={a.status}
                      onChange={(e) => handleStatusChange(a.id, e.target.value)}
                      className="text-xs border border-gray-200 rounded-lg
                                 px-2 py-1.5 text-gray-600 focus:outline-none
                                 focus:ring-1 focus:ring-primary-500 cursor-pointer"
                    >
                      <option value="APPLIED">Applied</option>
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="SHORTLISTED">Shortlist</option>
                      <option value="INTERVIEW_SCHEDULED">
                        Schedule Interview
                      </option>
                      <option value="REJECTED">Reject</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

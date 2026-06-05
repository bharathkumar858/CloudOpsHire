import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import jobService from "../../services/jobService";

// Static demo jobs — replace with API call once Job Service is built
const DEMO_JOBS = [
  {
    id: "1",
    title: "Senior Java Developer",
    company: "TechCorp India",
    location: "Hyderabad",
    jobType: "FULL_TIME",
    experienceLevel: "SENIOR",
    salaryMin: 1200000,
    salaryMax: 2000000,
    skills: ["Java", "Spring Boot", "Microservices"],
    isRemote: false,
    createdAt: "2026-05-10",
    status: "ACTIVE",
  },
  {
    id: "2",
    title: "React Frontend Engineer",
    company: "StartupXYZ",
    location: "Bangalore",
    jobType: "FULL_TIME",
    experienceLevel: "MID",
    salaryMin: 800000,
    salaryMax: 1400000,
    skills: ["React", "TypeScript", "Tailwind"],
    isRemote: true,
    createdAt: "2026-05-11",
    status: "ACTIVE",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Remote",
    jobType: "REMOTE",
    experienceLevel: "MID",
    salaryMin: 1000000,
    salaryMax: 1800000,
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins"],
    isRemote: true,
    createdAt: "2026-05-12",
    status: "ACTIVE",
  },
  {
    id: "4",
    title: "Full Stack Developer Intern",
    company: "InnovateTech",
    location: "Pune",
    jobType: "INTERNSHIP",
    experienceLevel: "ENTRY",
    salaryMin: 20000,
    salaryMax: 40000,
    skills: ["React", "Node.js", "MongoDB"],
    isRemote: false,
    createdAt: "2026-05-09",
    status: "ACTIVE",
  },
  {
    id: "5",
    title: "Backend Engineer - Python",
    company: "DataFlow Inc",
    location: "Chennai",
    jobType: "FULL_TIME",
    experienceLevel: "MID",
    salaryMin: 900000,
    salaryMax: 1500000,
    skills: ["Python", "FastAPI", "PostgreSQL", "Redis"],
    isRemote: false,
    createdAt: "2026-05-08",
    status: "ACTIVE",
  },
  {
    id: "6",
    title: "Cloud Architect",
    company: "GlobalTech",
    location: "Mumbai",
    jobType: "CONTRACT",
    experienceLevel: "LEAD",
    salaryMin: 2500000,
    salaryMax: 4000000,
    skills: ["AWS", "Azure", "Terraform", "K8s"],
    isRemote: true,
    createdAt: "2026-05-07",
    status: "ACTIVE",
  },
];

const JOB_TYPES = [
  "ALL",
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
  "REMOTE",
];
const EXP_LEVELS = ["ALL", "ENTRY", "MID", "SENIOR", "LEAD", "EXECUTIVE"];

const typeColors = {
  FULL_TIME: "badge-blue",
  PART_TIME: "badge-yellow",
  CONTRACT: "badge-purple",
  INTERNSHIP: "badge-green",
  REMOTE: "badge-gray",
};

function formatSalary(min, max) {
  const fmt = (n) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;
  return `${fmt(min)} – ${fmt(max)}`;
}

function daysSince(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  return `${diff} days ago`;
}

function JobCard({ job }) {
  return (
    <div
      className="card hover:shadow-md hover:border-primary-200
                    transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Company logo placeholder */}
        <div
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100
                        to-primary-200 flex items-center justify-center
                        text-primary-700 font-bold text-lg flex-shrink-0"
        >
          {job.company[0]}
        </div>
        <div className="flex-1 min-w-0">
          <Link
            to={`/jobs/${job.id}`}
            className="text-base font-semibold text-gray-900
                           group-hover:text-primary-600 transition-colors line-clamp-1"
          >
            {job.title}
          </Link>
          <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
        </div>
        {job.isRemote && (
          <span className="badge-green text-xs flex-shrink-0">Remote</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0
                     l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2
                     m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1
                     c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {formatSalary(job.salaryMin, job.salaryMax)}
        </span>
        <span className="flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {daysSince(job.createdAt)}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        <span
          className={`badge text-xs ${typeColors[job.jobType] || "badge-gray"}`}
        >
          {job.jobType.replace("_", " ")}
        </span>
        <span className="badge-gray text-xs">{job.experienceLevel}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {job.skills.slice(0, 4).map((s) => (
          <span
            key={s}
            className="px-2 py-0.5 bg-gray-50 border border-gray-200
                           rounded text-xs text-gray-600"
          >
            {s}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span
            className="px-2 py-0.5 bg-gray-50 border border-gray-200
                           rounded text-xs text-gray-400"
          >
            +{job.skills.length - 4} more
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          to={`/jobs/${job.id}`}
          className="btn-primary text-sm py-1.5 px-4 flex-1 text-center"
        >
          View & Apply
        </Link>
        <button className="btn-secondary text-sm py-1.5 px-3" title="Save job">
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
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    experienceLevel: PropTypes.string.isRequired,
    salaryMin: PropTypes.number.isRequired,
    salaryMax: PropTypes.number.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    isRemote: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default function JobsPage() {
  const [allJobs, setAllJobs] = useState(DEMO_JOBS);
  const [jobs, setJobs] = useState(DEMO_JOBS);
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("ALL");
  const [expLevel, setExpLevel] = useState("ALL");
  const [location, setLocation] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadJobs() {
      setLoading(true);
      try {
        const data = await jobService.getJobs();
        if (!ignore) {
          setAllJobs(Array.isArray(data) ? data : []);
          setUsingFallback(false);
        }
      } catch {
        if (!ignore) {
          setAllJobs(DEMO_JOBS);
          setUsingFallback(true);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadJobs();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let filtered = allJobs;
    if (search)
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(search.toLowerCase()) ||
          j.company.toLowerCase().includes(search.toLowerCase()) ||
          j.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())),
      );
    if (jobType !== "ALL")
      filtered = filtered.filter((j) => j.jobType === jobType);
    if (expLevel !== "ALL")
      filtered = filtered.filter((j) => j.experienceLevel === expLevel);
    if (location)
      filtered = filtered.filter((j) =>
        j.location.toLowerCase().includes(location.toLowerCase()),
      );
    if (remoteOnly) filtered = filtered.filter((j) => j.isRemote);
    setJobs(filtered);
  }, [allJobs, search, jobType, expLevel, location, remoteOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="page-title">Find Your Dream Job</h1>
        <p className="text-gray-500 mt-1">
          {loading ? "Loading jobs..." : `${jobs.length} jobs available`}
          {usingFallback ? " · demo data" : " · live data"}
        </p>
      </div>

      {/* Search bar */}
      <div className="card mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9"
              placeholder="Search job title, company, or skill..."
            />
          </div>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827
                       0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field pl-9 md:w-48"
              placeholder="Location..."
            />
          </div>
          <button
            onClick={() => {
              setSearch("");
              setLocation("");
              setJobType("ALL");
              setExpLevel("ALL");
              setRemoteOnly(false);
            }}
            className="btn-secondary text-sm whitespace-nowrap"
          >
            Clear filters
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-400 self-center mr-1">
              Type:
            </span>
            {JOB_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setJobType(t)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  jobType === t
                    ? "bg-primary-600 text-white border-primary-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary-300"
                }`}
              >
                {t === "ALL" ? "All" : t.replace("_", " ")}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-400 self-center mr-1">
              Level:
            </span>
            {EXP_LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setExpLevel(l)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  expLevel === l
                    ? "bg-primary-600 text-white border-primary-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary-300"
                }`}
              >
                {l === "ALL" ? "All" : l}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => setRemoteOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            Remote only
          </label>
        </div>
      </div>

      {/* Results */}
      {jobs.length === 0 ? (
        <div className="text-center py-20">
          <svg
            className="w-16 h-16 text-gray-200 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21
                     12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-400">No jobs found</h3>
          <p className="text-gray-400 text-sm mt-1">
            Try adjusting your filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import jobService from "../../services/jobService";
import applicationService from "../../services/applicationService";
import { findDemoJob } from "../../services/demoJobs";

const DEMO_JOBS = {
  1: {
    id: "1",
    title: "Senior Java Developer",
    company: "TechCorp India",
    location: "Hyderabad",
    jobType: "FULL_TIME",
    experienceLevel: "SENIOR",
    isRemote: false,
    salaryMin: 1200000,
    salaryMax: 2000000,
    skills: [
      "Java 17",
      "Spring Boot",
      "Microservices",
      "PostgreSQL",
      "Docker",
      "Redis",
    ],
    description: `We are looking for a Senior Java Developer to join our growing
engineering team. You will design and build scalable backend microservices.

Key Responsibilities:
- Design RESTful microservices using Spring Boot
- Work with RabbitMQ for event-driven architecture
- Optimize PostgreSQL queries and schemas
- Mentor junior developers and participate in code reviews
- Collaborate with DevOps on CI/CD pipelines

What we offer:
- Competitive salary + ESOPs
- Flexible work hours
- Health insurance for family
- ₹1L annual learning budget`,
    requirements: [
      "5+ years Java experience",
      "Strong Spring Boot & Spring Security knowledge",
      "Microservices architecture experience",
      "PostgreSQL and Redis proficiency",
      "Docker and Kubernetes familiarity",
    ],
    applicationDeadline: "2026-06-30",
    postedAt: "2026-05-10",
  },

  2: {
    id: "2",
    title: "React Frontend Engineer",
    company: "StartupXYZ",
    location: "Bangalore",
    jobType: "FULL_TIME",
    experienceLevel: "MID",
    isRemote: true,
    salaryMin: 800000,
    salaryMax: 1400000,
    skills: ["React", "TypeScript", "Tailwind CSS", "Redux", "REST APIs"],
    description: `Join our fast-growing startup as a React Frontend Engineer.
Build beautiful, performant UIs used by thousands of users daily.`,
    requirements: [
      "3+ years React experience",
      "TypeScript proficiency",
      "Experience with Redux or Zustand",
      "Tailwind CSS knowledge",
    ],
    applicationDeadline: "2026-06-15",
    postedAt: "2026-05-11",
  },

  3: {
    id: "3",
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Remote",
    jobType: "REMOTE",
    experienceLevel: "MID",
    isRemote: true,
    salaryMin: 1000000,
    salaryMax: 1800000,
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"],
    description: `We need a skilled DevOps Engineer to own our cloud infrastructure
and CI/CD pipelines.`,
    requirements: [
      "3+ years DevOps experience",
      "Strong AWS knowledge",
      "Docker and Kubernetes hands-on",
      "Terraform infrastructure-as-code",
    ],
    applicationDeadline: "2026-06-20",
    postedAt: "2026-05-12",
  },
};

function formatSalary(min, max) {
  const fmt = (n) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

  return `${fmt(min)} – ${fmt(max)} per year`;
}

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((s) => s.auth);

  const [job, setJob] = useState(DEMO_JOBS[id] || findDemoJob(id));
  const [loadingJob, setLoadingJob] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const [applied, setApplied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [cover, setCover] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef();

  useEffect(() => {
    let ignore = false;

    async function loadJob() {
      setLoadingJob(true);
      try {
        const data = await jobService.getJobById(id);
        if (!ignore) {
          setJob(data);
          setUsingFallback(false);
        }
      } catch {
        if (!ignore) {
          setJob(DEMO_JOBS[id] || findDemoJob(id));
          setUsingFallback(true);
        }
      } finally {
        if (!ignore) {
          setLoadingJob(false);
        }
      }
    }

    loadJob();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Job not found</h2>
        {loadingJob && <p className="text-gray-500 mt-2">Loading job...</p>}

        <button onClick={() => navigate("/jobs")} className="btn-primary mt-4">
          Back to Jobs
        </button>
      </div>
    );
  }

  const handleApply = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const candidateId = Number(user.userId || user.id);
    if (!candidateId) {
      toast.error("Please login again before applying");
      return;
    }

    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    setLoading(true);

    try {
      await applicationService.applyForJob({
        jobId: Number(job.id),
        candidateId,
        recruiterId: Number(job.recruiterId || 1),
        candidateName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        candidateEmail: user.email,
        jobTitle: job.title,
        company: job.company,
        coverLetter: cover,
        resumeFileName: resume.name,
      });

      setApplied(true);
      setShowForm(false);

      toast.success("Application submitted!");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to submit application";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const typeColor = {
    FULL_TIME: "badge-blue",
    REMOTE: "badge-green",
    CONTRACT: "badge-purple",
    INTERNSHIP: "badge-yellow",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/jobs")}
        className="flex items-center gap-2 text-sm text-gray-500
                   hover:text-primary-600 mb-6 transition-colors"
      >
        ← Back to jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-xl bg-gradient-to-br
                           from-primary-100 to-primary-200
                           flex items-center justify-center
                           text-primary-700 font-bold text-2xl"
              >
                {job.company[0]}
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {job.title}
                </h1>

                <p className="text-primary-600 font-medium mt-1">
                  {job.company}
                </p>
                {usingFallback && (
                  <p className="text-xs text-gray-400 mt-1">
                    Showing demo data because job-service is offline.
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  <span
                    className={`badge ${
                      typeColor[job.jobType] || "badge-gray"
                    }`}
                  >
                    {job.jobType.replace("_", " ")}
                  </span>

                  <span className="badge-gray">{job.experienceLevel}</span>

                  {job.isRemote && (
                    <span className="badge-green">Remote OK</span>
                  )}
                </div>
              </div>
            </div>

            {/* Meta */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4
                         mt-6 pt-6 border-t border-gray-100 text-sm"
            >
              <div>
                <p className="text-gray-400 text-xs uppercase mb-1">Location</p>

                <p className="font-medium text-gray-800">{job.location}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase mb-1">Salary</p>

                <p className="font-medium text-gray-800">
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase mb-1">Deadline</p>

                <p className="font-medium text-gray-800">
                  {job.applicationDeadline}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="card">
            <h2 className="section-title mb-4">Job Description</h2>

            <pre
              className="text-sm text-gray-700 whitespace-pre-wrap
                         font-sans leading-relaxed"
            >
              {job.description}
            </pre>
          </div>

          {/* Requirements */}
          <div className="card">
            <h2 className="section-title mb-4">Requirements</h2>

            <ul className="space-y-2">
              {job.requirements.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  ✅ {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="card">
            <h2 className="section-title mb-4">Skills Required</h2>

            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 bg-primary-50
                             text-primary-700 border
                             border-primary-200 rounded-lg
                             text-sm font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">
          <div className="card sticky top-24">
            <h3 className="section-title mb-4">Apply for this job</h3>

            {applied ? (
              <div className="text-center py-4">
                <div
                  className="w-12 h-12 bg-green-100 rounded-full
                             flex items-center justify-center
                             mx-auto mb-3"
                >
                  ✅
                </div>

                <p className="font-semibold text-gray-800">
                  Application Submitted!
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  We'll notify you of updates.
                </p>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn-secondary text-sm mt-4 w-full"
                >
                  View My Applications
                </button>
              </div>
            ) : (
              <>
                {!showForm ? (
                  <button
                    onClick={() =>
                      user ? setShowForm(true) : navigate("/login")
                    }
                    className="btn-primary w-full py-3"
                  >
                    {user ? "Apply Now" : "Login to Apply"}
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* Cover Letter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cover Letter
                        <span className="text-gray-400"> (optional)</span>
                      </label>

                      <textarea
                        value={cover}
                        onChange={(e) => setCover(e.target.value)}
                        rows={5}
                        className="input-field"
                        placeholder="Why are you a great fit for this role?"
                      />
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Resume
                        <span className="text-red-500"> *</span>
                      </label>

                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResume(e.target.files[0])}
                        className="block w-full text-sm text-gray-600
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:text-sm file:font-medium
                   file:bg-primary-50
                   file:text-primary-700
                   hover:file:bg-primary-100"
                      />

                      {resume && (
                        <p className="text-xs text-green-600 mt-2">
                          Selected: {resume.name}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      onClick={handleApply}
                      disabled={loading}
                      className="btn-primary w-full py-2.5"
                    >
                      {loading ? "Submitting..." : "Submit Application"}
                    </button>

                    {/* Cancel */}
                    <button
                      onClick={() => setShowForm(false)}
                      className="btn-secondary w-full py-2.5 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

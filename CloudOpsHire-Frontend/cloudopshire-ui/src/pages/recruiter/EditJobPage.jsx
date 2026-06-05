import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// Same demo data — in production this comes from API
const DEMO_JOBS = {
  1: {
    title: "Senior Java Developer",
    company: "TechCorp India",
    jobType: "FULL_TIME",
    experienceLevel: "SENIOR",
    location: "Hyderabad",
    salaryMin: 1200000,
    salaryMax: 2000000,
    isRemote: false,
    applicationDeadline: "2026-06-30",
    description: "We are looking for a Senior Java Developer...",
    skills: ["Java 17", "Spring Boot", "Microservices"],
  },
  3: {
    title: "DevOps Engineer",
    company: "CloudSystems",
    jobType: "REMOTE",
    experienceLevel: "MID",
    location: "Remote",
    salaryMin: 1000000,
    salaryMax: 1800000,
    isRemote: true,
    applicationDeadline: "2026-06-20",
    description: "We need a skilled DevOps Engineer...",
    skills: ["AWS", "Docker", "Kubernetes"],
  },
  5: {
    title: "Backend Engineer - Python",
    company: "DataFlow Inc",
    jobType: "FULL_TIME",
    experienceLevel: "MID",
    location: "Chennai",
    salaryMin: 900000,
    salaryMax: 1500000,
    isRemote: false,
    applicationDeadline: "2026-06-10",
    description: "DataFlow Inc is hiring a Python Backend Engineer...",
    skills: ["Python", "FastAPI", "PostgreSQL"],
  },
};

const ALL_SKILLS = [
  "Java",
  "Spring Boot",
  "React",
  "Node.js",
  "Python",
  "FastAPI",
  "AWS",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "TypeScript",
  "Microservices",
  "Jenkins",
  "Terraform",
  "Linux",
];

export default function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = DEMO_JOBS[id];
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(job?.skills || []);

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: job || {},
  });

  if (!job)
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Job not found</h2>
        <button
          onClick={() => navigate("/recruiter")}
          className="btn-primary mt-4"
        >
          Back to Dashboard
        </button>
      </div>
    );

  const toggleSkill = (s) =>
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const onSubmit = async (data) => {
    setLoading(true);
    // TODO: PUT /api/jobs/:id
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Job updated successfully!");
    navigate("/recruiter");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/recruiter")}
        className="flex items-center gap-2 text-sm text-gray-500
                         hover:text-primary-600 mb-6 transition-colors"
      >
        ← Back to Dashboard
      </button>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 bg-primary-100 rounded-lg flex items-center
                          justify-center text-primary-600 text-lg"
          >
            ✏️
          </div>
          <div>
            <h1 className="page-title">Edit Job</h1>
            <p className="text-gray-400 text-sm">
              Update your job posting details
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                {...register("title", { required: true })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                {...register("company", { required: true })}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select {...register("jobType")} className="input-field">
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="REMOTE">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level
              </label>
              <select {...register("experienceLevel")} className="input-field">
                <option value="ENTRY">Entry Level</option>
                <option value="MID">Mid Level</option>
                <option value="SENIOR">Senior</option>
                <option value="LEAD">Lead</option>
                <option value="EXECUTIVE">Executive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input {...register("location")} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application Deadline
              </label>
              <input
                {...register("applicationDeadline")}
                type="date"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Salary (₹)
              </label>
              <input
                {...register("salaryMin")}
                type="number"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Salary (₹)
              </label>
              <input
                {...register("salaryMax")}
                type="number"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label
              className="flex items-center gap-2 cursor-pointer text-sm
                               font-medium text-gray-700"
            >
              <input
                {...register("isRemote")}
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary-600"
              />
              Remote work allowed
            </label>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_SKILLS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSkill(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm border
                                    transition-all ${
                                      selectedSkills.includes(s)
                                        ? "bg-primary-600 text-white border-primary-600"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-primary-300"
                                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description *
            </label>
            <textarea
              {...register("description", { required: true })}
              className="input-field"
              rows={6}
            />
          </div>

          {/* Status toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Status
            </label>
            <select {...register("status")} className="input-field">
              <option value="ACTIVE">Active — accepting applications</option>
              <option value="PAUSED">Paused — temporarily hidden</option>
              <option value="CLOSED">Closed — no longer accepting</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 py-3"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/recruiter")}
              className="btn-secondary px-6"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

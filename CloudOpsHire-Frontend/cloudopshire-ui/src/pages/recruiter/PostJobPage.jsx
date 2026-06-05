import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SKILLS_OPTIONS = [
  "Java",
  "Spring Boot",
  "React",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "TypeScript",
  "Microservices",
];

export default function PostJobPage() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleSkill = (s) =>
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const onSubmit = async (data) => {
    if (selectedSkills.length === 0) {
      toast.error("Select at least one skill");
      return;
    }
    setLoading(true);
    // TODO: POST to job-service API
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Job posted successfully! 🎉");
    navigate("/recruiter");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/recruiter")}
        className="flex items-center gap-2 text-sm text-gray-500
                         hover:text-primary-600 mb-6"
      >
        ← Back to Dashboard
      </button>

      <div className="card">
        <h1 className="page-title mb-1">Post a New Job</h1>
        <p className="text-gray-500 text-sm mb-6">
          Fill in the details below to attract the best candidates.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                {...register("title", { required: "Job title required" })}
                className="input-field"
                placeholder="e.g. Senior Java Developer"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                {...register("companyName", {
                  required: "Company name required",
                })}
                className="input-field"
                placeholder="e.g. TechCorp India"
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type *
              </label>
              <select
                {...register("jobType", { required: true })}
                className="input-field"
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="REMOTE">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level *
              </label>
              <select {...register("experienceLevel")} className="input-field">
                <option value="ENTRY">Entry Level</option>
                <option value="MID">Mid Level</option>
                <option value="SENIOR">Senior</option>
                <option value="LEAD">Lead / Principal</option>
                <option value="EXECUTIVE">Executive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                {...register("location", { required: "Location required" })}
                className="input-field"
                placeholder="e.g. Hyderabad, India"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application Deadline *
              </label>
              <input
                {...register("applicationDeadline", { required: true })}
                type="date"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Salary (₹/year)
              </label>
              <input
                {...register("salaryMin")}
                type="number"
                className="input-field"
                placeholder="800000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Salary (₹/year)
              </label>
              <input
                {...register("salaryMax")}
                type="number"
                className="input-field"
                placeholder="1500000"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
              <input
                {...register("isRemote")}
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary-600"
              />
              Remote work allowed
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills *{" "}
              <span className="text-gray-400">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SKILLS_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSkill(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description *
            </label>
            <textarea
              {...register("description", { required: "Description required" })}
              className="input-field"
              rows={6}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 py-3"
            >
              {loading ? "Posting..." : "Post Job"}
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

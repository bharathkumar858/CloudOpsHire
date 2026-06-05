import api from "./api";

const jobService = {
  getJobs: (params) =>
    api.get("/api/jobs", { params }).then((r) => r.data.data || r.data),

  getJobById: (id) =>
    api.get(`/api/jobs/${id}`).then((r) => r.data.data || r.data),

  createJob: (data) => api.post("/api/jobs", data).then((r) => r.data.data),

  updateJob: (id, data) =>
    api.put(`/api/jobs/${id}`, data).then((r) => r.data.data),

  getRecruiterJobs: (recruiterId) =>
    api.get(`/api/jobs/recruiter/${recruiterId}`).then((r) => r.data.data),
};

export default jobService;

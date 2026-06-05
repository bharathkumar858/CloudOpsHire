import api from "./api";

const applicationService = {
  apply: (jobId, coverLetter, resumeFile) => {
    const form = new FormData();
    form.append("jobId", jobId);
    form.append("coverLetter", coverLetter || "");
    if (resumeFile) form.append("resumeFile", resumeFile);
    return api
      .post("/api/applications", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data.data);
  },

  getMyApplications: () =>
    api.get("/api/applications/my").then((r) => r.data.data),

  getJobApplications: (jobId) =>
    api.get(`/api/applications/job/${jobId}`).then((r) => r.data.data),

  updateStatus: (appId, status) =>
    api
      .put(`/api/applications/${appId}/status`, { status })
      .then((r) => r.data.data),
};

export default applicationService;

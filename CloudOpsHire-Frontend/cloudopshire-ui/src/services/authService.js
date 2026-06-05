import api from "./api";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);
    // response.data = ApiResponse wrapper
    // response.data.data = actual AuthResponse with tokens
    return response.data.data;
  },

  register: async (userData) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await api.post("/api/auth/logout", null, {
        headers: { "X-Refresh-Token": refreshToken },
      });
    }
  },
};

export default authService;

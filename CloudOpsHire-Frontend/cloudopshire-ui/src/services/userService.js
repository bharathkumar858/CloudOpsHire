import api from "./api";

const userService = {
  // Create user profile after registration
  createProfile: async (profileData) => {
    const response = await api.post("/api/users/profile", profileData);

    return response.data;
  },

  // Get logged-in user's profile
  getMyProfile: async () => {
    const response = await api.get("/api/users/me");

    return response.data;
  },

  // Update logged-in user's profile
  updateProfile: async (data) => {
    const response = await api.put("/api/users/me", data);

    return response.data;
  },
};

export default userService;

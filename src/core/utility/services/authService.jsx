import api from "../../components/authentication/interceptor";

export const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password }); 
    if (response.data?.status === "success") {
        const accessToken = response.data.data.accessToken; // Extract token
        localStorage.setItem("token", accessToken); // Store token
        return response.data;
    }
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

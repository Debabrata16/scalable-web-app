import axios from "axios";

// fallback if env not loaded
const baseURL =
  import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL,
});

// Attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: auto logout if token invalid
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;

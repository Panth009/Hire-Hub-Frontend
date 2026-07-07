import axios, { InternalAxiosRequestConfig } from "axios";
import { setProfile } from "../Slice/ProfileSlice";
import { removeUser } from "../Slice/UserSlice";
import { removeJwt } from "../Slice/JwtSlice";

const axiosInstance = axios.create({
  baseURL: "https://hire-hub-backend-3.onrender.com/",
});

// =======================
// REQUEST INTERCEPTOR
// =======================
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =======================
// RESPONSE INTERCEPTOR
// =======================
export const setupResponseInterceptor = (navigate: any, dispatch: any) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // SAFE ACCESS (IMPORTANT FIX)
      const status = error?.response?.status;

      console.log("API Error:", error?.message);

      // If unauthorized
      if (status === 401) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");

        dispatch(removeJwt());
        dispatch(removeUser());
        dispatch(setProfile(null));

        navigate("/login");
      }

      // Network error handling (VERY IMPORTANT)
      if (!error.response) {
        console.log("Network error or server not reachable");
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
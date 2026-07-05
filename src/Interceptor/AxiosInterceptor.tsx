import axios, { InternalAxiosRequestConfig } from "axios";
import { setProfile } from "../Slice/ProfileSlice";
import { removeUser, setUser } from "../Slice/UserSlice";
import { removeJwt, setJwt } from "../Slice/JwtSlice";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000'
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('jwt');
    
    // console.log("Interceptor called");
    // console.log("Token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setupResponseInterceptor=(navigate:any, dispatch:any)=>{
    axiosInstance.interceptors.response.use(
        (response)=>{
            return response;
        },
        (error)=>{
            if(error.response.status === 401){
              localStorage.removeItem("jwt");
              localStorage.removeItem("user"); 
              // Redux clear
              dispatch(removeJwt());
              dispatch(removeUser());
              dispatch(setProfile(null));
              navigate("/login");
            }
            return Promise.reject(error);
        }
    )
}

export default axiosInstance;
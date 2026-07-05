import axiosInstance from "../Interceptor/AxiosInterceptor"

const base_url = "http://localhost:9000/users/"

const registerUser = async (user:any)=>{
    return axiosInstance.post(`/users/register`,user).then(res=>res.data).catch(error=>{throw error})
}

const loginUser = async (login : any)=>{
    return axiosInstance.post(`/users/login`,login).then(res=>res.data).catch(error=>{throw error})
}

const sendotp= async (email:any)=> {
    return axiosInstance.post(`/users/sendOtp/${email}`)
        .then(result => result. data)
        .catch(error =>{throw error; });
}

const verifyotp = async (email: any, otp: any) => {
    return axiosInstance.post(`/users/verifyOtp/${email}/${otp}`)
        .then(result => result.data)
        .catch(error => { throw error; });
}

const changePass = async (email: string, password: string) => {
    return axiosInstance.post(`/users/changePass`, { email, password })
        .then(result => result.data)
        .catch(error => { throw error; });
}

export {registerUser, loginUser, sendotp, verifyotp, changePass}
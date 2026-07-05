import axiosInstance from "../Interceptor/AxiosInterceptor";


const base_url = "http://localhost:9000/jobs/"

const postJob = async (job:any) => { 
    return axiosInstance.post(`/jobs/post`, job)
            .then(res => {
                // console.log(res.data)
                return res.data})
            .catch(error => {throw error});
}

const getAllJobs = async ()=> {
    return axiosInstance.get(`/jobs/getAllJob`)
        .then(result => result.data)
        .catch(err => {throw err;});
}

const getJob = async(id: any) =>{
    return axiosInstance.get(`/jobs/getJob/${id}`)
        .then(result => result.data)
        .catch(error => {throw error;})
}

const applyJob = async(id:any, applicant:any) => {
    return axiosInstance.post(`/jobs/apply/${id}`, applicant)
        .then(result => result.data)
        .catch(error => {throw error;})
}

const getJobPostedBy = async(id:any) => {
    return axiosInstance.get(`/jobs/postedBy/${id}`)
        .then(result => result.data)
        .catch(error => {throw error;})
}   

const changeAppStatus = async(application:any) => {
    console.log(application)
    return axiosInstance.post(`/jobs/changeAppStatus`, application)
        .then(result => result.data)
        .catch(error => {throw error;})
}

export {postJob, getAllJobs, getJob, applyJob, getJobPostedBy, changeAppStatus};

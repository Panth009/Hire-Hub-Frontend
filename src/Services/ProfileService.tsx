import axiosInstance from "../Interceptor/AxiosInterceptor";


const base_url = "http://localhost:9000/profiles/"

const getProfile = async (profileId : any) => {
    return axiosInstance.get(`/profiles/get/${profileId}`)
        .then(result => result.data)
        .catch(error => { throw error; });
}

const getAllProfiles = async () => {
    return axiosInstance.get(`/profiles/getAllProfiles`)
        .then(result => result.data)
        .catch(error => { throw error; });
}

const updateProfile = async (profile : any) => {
    return axiosInstance.put(`/profiles/update`,profile)
        .then(result => result.data)
        .catch(error => { throw error; });
}


export {getProfile, updateProfile, getAllProfiles}
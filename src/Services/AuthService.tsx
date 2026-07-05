import axios from 'axios';
const base_url = "https://hire-hub-backend-2.onrender.com/"

const loginUser = async (login:any)=> {
    return axios.post(`${base_url}/auth/login`, login)
    .then(result => result.data)
    .catch(error =>{throw error; });
}

const navigateToLogin=(navigate:any)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/login");
}

export {loginUser, navigateToLogin} ;
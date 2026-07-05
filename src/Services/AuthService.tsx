import axios from 'axios';
const base_url = "http://localhost:9000/auth/"

const loginUser = async (login:any)=> {
    return axios.post(`${base_url}login`, login)
    .then(result => result.data)
    .catch(error =>{throw error; });
}

const navigateToLogin=(navigate:any)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/login");
}

export {loginUser, navigateToLogin} ;
import axios from 'axios';


export const unAuthAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});  

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});  

axiosInstance.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("jwtToken")
        config.headers.Authorization = `Bearer ${token}`;
        return config; 
    },
    (error) =>{
        return Promise.reject(error);
    }
)

export default axiosInstance;    
import axios from 'axios';
require("dotenv").config();


const ApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL ;

const axiosInstance = axios.create({
    baseURL: ApiUrl,
    withCredentials: true, // This is important to include cookies in requests
    });

export default axiosInstance;
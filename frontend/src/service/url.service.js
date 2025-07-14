import axios from 'axios';

const ApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: ApiUrl,
    withCredentials: true, // This is important to include cookies in requests
    });

export default axiosInstance;
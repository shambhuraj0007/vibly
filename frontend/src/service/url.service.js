import axios from 'axios';

const ApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: ApiUrl,
    withCredentials: true, // This is important to include cookies in requests
    });

export default axiosInstance;
import axios from "axios";
import { LocalStorageKey } from "../constants/key";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

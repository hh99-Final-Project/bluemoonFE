import axios from 'axios';
import { getCookie } from '../utils/cookie';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
});

export const fileInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

fileInstance.interceptors.request.use(
    config => {
        const accessToken = getCookie('authorization');
        if (accessToken) {
            config.headers["authorization"] = accessToken;
            return config;
        }
        return config;
    },
    error => {
        return;
    },
);


instance.interceptors.request.use(
    config => {
        const accessToken = getCookie('authorization');
        if (accessToken) {
            config.headers["authorization"] = accessToken;
            return config;
        }
        return config;
    },
    error => {
        return;
    },
);

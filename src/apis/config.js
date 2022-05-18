import axios from "axios";
import { getCookie } from "../utils/cookie";
import { store } from "../redux/store";
import { showError } from "../redux/modules/errorSlice";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "*"
    }
});

export const fileInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

fileInstance.interceptors.request.use(
    config => {
        const accessToken = getCookie("authorization");
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
        const accessToken = getCookie("authorization");
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

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error,"error");
    // store.dispatch(showError({ isOpen: true, message: error.response.data.message }));
    return Promise.reject(error);
});



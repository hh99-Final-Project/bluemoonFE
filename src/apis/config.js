import axios from "axios";
import {getCookie, deleteCookie, setRefreshCookie, setAccessCookie} from "../utils/cookie";
import { store } from "../redux/store";
import { showError } from "../redux/modules/errorSlice";
import { logout, getUserInfo } from "../redux/modules/userSlice";
import { userApi } from "./userApi";
import { isModalOpen } from "../redux/modules/commonSlice";
import {useQueryClient} from "react-query";


export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "*",
    },
});

export const fileInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Headers": "*",
    },
});

let isTokenRefreshing = false;
const refreshSubscribers = [];
const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

fileInstance.interceptors.request.use(
    (config) => {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
            config.headers["authorization"] = accessToken;
            return config;
        }
        return config;
    },
    (error) => {
        return;
    },
);

instance.interceptors.request.use(
    (config) => {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
            config.headers["authorization"] = accessToken;
            return config;
        }
        return config;
    },
    (error) => {
        console.log(error,"error");
        return;
    },
);

instance.interceptors.response.use(
    function (response) {

        let originRequest = response.config;
        if (response.data.errorMessage === "만료된 토큰입니다.") {
            if(!isTokenRefreshing){
                isTokenRefreshing = true;
                let axiosConfig = {
                    headers: {
                        RefreshToken: getCookie("refreshToken")
                    }
                };

                axios.post(process.env.REACT_APP_BASE_URL + "/api/refresh", {}, axiosConfig).then((res) => {
                    let accessToken = res.headers.authorization;
                    deleteCookie("accessToken");
                    setAccessCookie(accessToken);
                    instance.defaults.headers.common.authorization = accessToken;
                    isTokenRefreshing = false;
                    refreshSubscribers.map((callback) => callback(accessToken));
                    return axios(originRequest);
                });
            }

            const retryOriginRequest = new Promise((resolve) => {
                addRefreshSubscriber((accessToken) => {
                    if(originRequest.headers) {
                        originRequest.headers.authorization = accessToken;
                        resolve(axios(originRequest));
                    }
                });
            });

            return retryOriginRequest;
        }


        return response;
    },
    function (error) {
        console.log(error, "error");
        store.dispatch(showError({ isOpen: true, message: error.response.data.message }));
        return Promise.reject(error);
    },
);

fileInstance.interceptors.response.use(
    function (response) {
        let originRequest = response.config;
        if (response.data.errorMessage === "만료된 토큰입니다.") {
            if(!isTokenRefreshing){

                let axiosConfig = {
                    headers: {
                        RefreshToken: getCookie("refreshToken")
                    }
                };

                axios.post(process.env.REACT_APP_BASE_URL + "/api/refresh", {}, axiosConfig).then((res) => {
                    let accessToken = res.headers.authorization;
                    deleteCookie("accessToken");
                    setAccessCookie(accessToken);
                    instance.defaults.headers.common.authorization = accessToken;
                    isTokenRefreshing = false;
                    refreshSubscribers.map((callback) => callback(accessToken));
                    return axios(originRequest);
                });
            }

            const retryOriginRequest = new Promise((resolve) => {
                addRefreshSubscriber((accessToken) => {
                    if(originRequest.headers) {
                        originRequest.headers.authorization = accessToken;
                        resolve(axios(originRequest));
                    }
                });
            });

            return retryOriginRequest;
        }

        return response;
    },
    function (error) {
        console.log(error, "error");
        store.dispatch(showError({ isOpen: true, message: error.response.data.message }));
        return Promise.reject(error);
    },
);

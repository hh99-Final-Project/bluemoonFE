import axios from "axios";
import {getCookie, deleteCookie, setRefreshCookie, setAccessCookie} from "../utils/cookie";
import { store } from "../redux/store";
import { showError } from "../redux/modules/errorSlice";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "*",
    },
});


let isTokenRefreshing = false;
let refreshSubscribers = [];
const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

instance.interceptors.request.use(
    (config) => {
        // const accessToken = getCookie("accessToken");
        const accessToken = localStorage.getItem("accessToken");

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
            console.log("만료된토큰!");
            if(!isTokenRefreshing){
                isTokenRefreshing = true;
                let axiosConfig = {
                    headers: {
                        RefreshToken: localStorage.getItem("refreshToken")
                    }
                };

                axios.post(process.env.REACT_APP_BASE_URL + "/api/refresh", {}, axiosConfig).then((res) => {
                    let accessToken = res.headers.authorization;
                    instance.defaults.headers["authorization"] = accessToken;
                    localStorage.setItem("accessToken", accessToken);
                    refreshSubscribers.map((callback) => callback(accessToken));
                    refreshSubscribers = [];
                    isTokenRefreshing = false;
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


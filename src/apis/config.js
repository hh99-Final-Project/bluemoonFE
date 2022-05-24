import axios from "axios";
import { getCookie, deleteCookie } from "../utils/cookie";
import { store } from "../redux/store";
import { showError } from "../redux/modules/errorSlice";
import { logout } from "../redux/modules/userSlice";
import { userApi } from "./userApi";
import {isModalOpen} from "../redux/modules/commonSlice";

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
    },
});

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
        return;
    },
);

instance.interceptors.response.use(
    function (response) {
        if(response.data.errorMessage === "만료된 토큰입니다.") {
            window.alert("토큰이 만료되어 로그아웃됩니다! 다시 로그인 해주세요..🥺");
            store.dispatch(logout());
            deleteCookie("accessToken");
            store.dispatch(isModalOpen(true));
            // const refreshToken = await userApi.getRefreshToken();
            // store.dispatch(logout());
            // deleteCookie("accessToken");
            // window.location.href = "/";
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
        if(response.data.errorMessage === "만료된 토큰입니다.") {
            window.alert("토큰이 만료되어 로그아웃됩니다! 다시 로그인 해주세요..🥺");
            store.dispatch(logout());
            deleteCookie("accessToken");
            store.dispatch(isModalOpen(true));
        }
        return response;
    },
    function (error) {
        console.log(error, "error");
        store.dispatch(showError({ isOpen: true, message: error.response.data.message }));
        return Promise.reject(error);
    },
);




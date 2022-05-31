import axios from "axios";
import { getCookie, deleteCookie, setRefreshCookie, setAccessCookie } from "../utils/cookie";
import { store } from "../redux/store";
import { showError } from "../redux/modules/errorSlice";

export const instance = axios.create({
    // 데이터를 요청할 기본 주소
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "*",
    },
});

let isTokenRefreshing = false;
let refreshSubscribers = [];
// callback 이라는 인자를 받으면, 그 인자를 refreshSubscribers 배열에 더한다.
const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

instance.interceptors.request.use(
    (config) => {
        // config 에는 위의 instance 객체를 request 를 보냈을 때의 모든 설정이 들어있다.
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers["authorization"] = accessToken;
            return config;
        }
        return config;
    },
    (error) => {
        console.log(error, "error");
        return;
    },
);

instance.interceptors.response.use(
    function (response) {
        // 요청을 보낸 뒤에 response 가 오는 경우, 여기서 먼저 확인 가능하다.
        let originRequest = response.config;
        // 만료된 토큰이라는 응답을 받은 경우,
        if (response.data.errorMessage === "만료된 토큰입니다.") {
            // 1) isTokenRefreshing 이 false일 땐 이를 true 로 변경하고
            if (!isTokenRefreshing) {
                isTokenRefreshing = true;
                // 헤더에 refreshToken 을 넣어 새 accessToken 을 발급받는다.
                let axiosConfig = {
                    headers: {
                        RefreshToken: localStorage.getItem("refreshToken"),
                    },
                };
                axios.post(process.env.REACT_APP_BASE_URL + "/api/refresh", {}, axiosConfig).then((res) => {
                    let accessToken = res.headers.authorization;
                    // 새 accessToken 을 발급받아 instance 의 header 에 넣고, localStorage 에 저장한다.
                    instance.defaults.headers["authorization"] = accessToken;
                    localStorage.setItem("accessToken", accessToken);

                    // 그러고 나서 refreshSubscribers 에 저장되어있던 callback 함수를 새 accessToken 을 넣어 실행한다.
                    refreshSubscribers.map((callback) => callback(accessToken));

                    // refreshSubscriber 배열을 초기화하고, isTokenRefreshing 을 false 로 변경한다.
                    refreshSubscribers = [];
                    isTokenRefreshing = false;
                });
            }
            // 2) isTokenRefreshing 이 true 일 땐, Promise 객체 retryOrgininRequest 를 만들고, 이 객체를 반환한다.
            const retryOriginRequest = new Promise((resolve) => {
                // callback 함수를 RefreshSubscriber 배열에 더한다.
                addRefreshSubscriber((accessToken) => {
                    // response.config 에 headers 가 있으면 header 에 accessToken 넣고,
                    if (originRequest.headers) {
                        originRequest.headers.authorization = accessToken;
                        // axios(originRequest) 실행
                        resolve(axios(originRequest));
                    }
                });
            });
            // promise 객체를 반환하는데, 이걸 어떻게 활용하는지는 확인 필요
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

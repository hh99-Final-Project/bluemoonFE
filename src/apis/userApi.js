import { instance } from "./config";

export const userApi = {
    kakaoLogin: async (accessToken) => {
        let req = {
            jwtToken: accessToken,
        };
        const data = await instance.post("/api/login/kakao", req);
        return data;
    },

    googleLogin: async (accessToken) => {
        let req = {
            jwtToken: accessToken,
        };
        const data = await instance.post("/api/login/google", req);
        return data;
    },

    getMyPage: async (page) => {
        const data = await instance.get(`/api/myposts/${page}`);
        return data.data;
    },

    isLogin: async () => {
        const data = await instance.get("/api/user/islogin");
        return data.data;
    },

    getRefreshToken: async () => {
        const data = await instance.post("/api/refresh", config);
        return data;

    },

    nickNameCheck: async (nickName) => {
        let req = {
            nickname: nickName,
        };
        const data = await instance.post("/api/nicknames", req);
        return data;
    },

    saveNickName: async (nickName, recommender) => {
        let req = {
            nickname: nickName,
            recommender: recommender,
        };
        const data = await instance.post("/api/user/nickname", req);
        return data;
    },

    tryLottery: async () => {
        const data = await instance.get("/api/lot");
        return data;
    },

    EnterInfo: async (phoneNumber, isChecked) => {
        let req = {
            phoneNumber: phoneNumber,
            personalInfo: isChecked,
        };
        const data = await instance.put("/api/lot/info", req);
        return data;
    },
};

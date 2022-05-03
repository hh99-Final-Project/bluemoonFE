import { instance } from "./config";

export const userApi = {
    getTest: async () => {
        const data = await instance.get("/api/test");
        return data;
    },

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

    // getMyTempPage: async () => {
    //     const data = await instance.get("/api/temporarys");
    //     return data;
    // },

    nickNameCheck: async (nickName) => {
        let req = {
            nickname: nickName,
        };
        const data = await instance.post("/api/nicknames", req);
        return data;
    },

    saveNickName: async (nickName) => {
        let req = {
            nickname: nickName,
        };
        const data = await instance.post("/api/user/nickname", req);
        return data;
    },
};

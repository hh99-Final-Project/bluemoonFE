import { instance } from "./apiConfig";



export const userApi = {
    getTest: async () => {
        const data = await instance.get('/api/test');
        return data;
    },

    kakaoLogin: async (accessToken) => {
        let req = {
            "jwtToken": accessToken
        }
        const data = await instance.post('/api/login/kakao', req);
        return data;
    },

    googleLogin: async (accessToken) => {
        let req = {
            "jwtToken": accessToken
        }
        const data = await instance.post('/api/login/google', req);
        return data;
    },

    getMyPage: async (page) => {
        const data = await instance.get(`/api/myposts/${page}`);
        return data;
    }
};
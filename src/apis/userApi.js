import { instance } from "./apiConfig";



export const userApi = {
    getTest: async () => {
        const data = await instance.get('/api/test');
        return data;
    },
};
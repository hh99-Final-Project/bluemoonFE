import { instance } from "./config";


export const diaryApi = {
    createPost: async (title, content) => {
        let req = {
            "title" : title,
            "content" : content
        }
        const data = await instance.post('/api/posts', req)
        return data;
    },

    getOneDiary: async () => {
        const data = await instance.get('/api/posts');
        return data.data;
    },

    deleteDiary: async (postId) => {
        const data = await instance.delete(`/api/posts/${postId}`)
        return data;
    },

    // getDetailDiary:

};
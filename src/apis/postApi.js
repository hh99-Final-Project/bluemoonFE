import { instance } from "./apiConfig";


export const postApi = {
    createPost: async (title, content) => {
        let req = {
            "title" : title,
            "content" : content
        }
        const data = await instance.post('/api/posts', req)
    },

    getRandomDiary: async () => {
        // const data = awiat instance.get('/api/posts')
    }
};
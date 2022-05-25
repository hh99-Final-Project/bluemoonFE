import { instance } from "./config";

export const diaryApi = {
    createPost: async (title, content, audioUrl, recordTime) => {
        let req = {
            title: title,
            content: content,
            timer: recordTime,
        };
        let json = JSON.stringify(req);
        const form = new FormData();
        const blob = new Blob([json], { type: "application/json" });
        form.append("requestDto", blob);
        audioUrl !== undefined && form.append("file", audioUrl);
        let headerConfig = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        const data = await instance.post("/api/posts", form, headerConfig);
        return data;
    },

    getDiaryList: async (page) => {
        const data = await instance.get(`/api/posts/${page}`);
        return data.data;
    },

    getOneDiary: async (postId) => {
        const data = await instance.get(`/api/postsDetail/${postId}`);
        return data.data;
    },

    deleteDiary: async (postId) => {
        const data = await instance.delete(`/api/posts/${postId}`);
        return data;
    },

    createComment: async (postId, comment, audioUrl, isLocked, parentCommentId, time) => {
        let req = {
            postUuid: postId,
            content: comment,
            lock: isLocked,
            parentUuid: parentCommentId,
            timer: time
        };

        const form = new FormData();
        let json = JSON.stringify(req);
        const blob = new Blob([json], { type: "application/json" });
        form.append("requestDto", blob);
        audioUrl !== undefined && form.append("file", audioUrl);

        let headerConfig = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        const data = await instance.post("/api/comments", form, headerConfig);
        return data;
    },

    deleteComment: async (commentId) => {
        const data = await instance.delete(`/api/comments/${commentId}`);
        return data;
    },

    //비로그인한 사용자 게시글 조회
    getNotLoginUserDiary: async () => {
        const data = await instance.get("/api/posts/anonymous");
        return data;
    },

    //비로그인한 사용자 게시글 detail
    getNotLoginUserDetail: async () => {
        const data = await instance.get("/api/posts/anonymous/one");
        return data.data;
    },

    // 댓글 알람 리스트 조회
    getCommentAlertList: async (page) => {
        const data = await instance.get(`/api/alarm/${page}`);
        return data;
    },
};

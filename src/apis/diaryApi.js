import { instance, fileInstance } from "./config";

export const diaryApi = {
  createPost: async (title, content, audioUrl) => {
    let req = {
      title: title,
      content: content,
    }
    let json = JSON.stringify(req)
    const form = new FormData();
    const blob = new Blob([json], { type: "application/json" })
    form.append('requestDto',blob);
    audioUrl !== undefined && form.append('file', audioUrl);

        const data = await fileInstance.post("/api/posts", form);
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

  createComment: async (postId, comment, audioUrl) => {
    let req = {
      "postUuid": postId,
      "content": comment
    }

    const form = new FormData();
    let json = JSON.stringify(req)
    const blob = new Blob([json], { type: "application/json" })
    form.append('requestDto',blob);
    audioUrl !== undefined && form.append('file', audioUrl);


    const data = await fileInstance.post("/api/comments", form);
    return data;
  },

    deleteComment: async (commentId) => {
        const data = await instance.delete(`/api/comments/${commentId}`);
        return data;
    },

    tempSaveDiary: async (title, diary) => {
        let req = {
            title: title,
            content: diary,
        };
        const data = await instance.post("/api/temporary", req);
        return data;
    },

    getTempDiaries: async () => {
        const data = await instance.get("/api/temporarys");
        return data;
    },

    getOneTempDiary: async (tempId) => {
        const data = await instance.get(`/api/temporary/${tempId}`);
        return data;
    },

    deleteTempDiary: async (tempId) => {
        const data = await instance.delete(`api/temporary/${tempId}`);
        return data;
    },

    //임시 저장에서 게시물로 저장하기,
    // FIXME: api명 명확하게 수정
    saveTempToDiary: async (tempId, title, content) => {
        let req = {
            title: title,
            content: content,
        };
        const data = await instance.post(`/api/mytemporary/${tempId}`, req);
        return data;
    },

    //임시저장에서 다시 임시저장
    saveTempToTemp: async (tempId, title, content) => {
        let req = {
            title: title,
            content: content,
        };
        const data = await instance.put(`api/mytemporary/${tempId}`, req);
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
        return data;
    },
};

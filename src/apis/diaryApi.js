import { instance } from "./config";

export const diaryApi = {
  createPost: async (title, content) => {
    let req = {
      title: title,
      content: content,
    };
    const data = await instance.post("/api/posts", req);
    return data;
  },

  getDiaryList: async (page) => {
    const data = await instance.get(`/api/posts/${page}`);
    return data.data;
  },

  getOneDiary: async (postId) => {
    const data = await instance.get(`/api/posts/${postId}`);
    return data.data;
  },

  deleteDiary: async (postId) => {
    const data = await instance.delete(`/api/posts/${postId}`);
    return data;
  },

  createComment: async (postId, comment) => {
    let req = {
      "postId": postId,
      "content": comment
    }
    const data = await instance.post('/api/comments', req);
    return data;
  },

  deleteComment: async (commentId) => {
    const data = await instance.delete(`/api/comments/${commentId}`);
    return data;
  },

  tempSaveDiary: async (title, diary) => {
    let req = {
      "title": title,
      "content": diary
    }
    const data = await instance.post('/api/temporary', req);
    return data;
  },

  getTempDiaries: async () => {
    const data = await instance.get('/api/temporarys');
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
      "title": title,
      "content": content
    }
    const data = await instance.post(`/api/mytemporary/${tempId}`, req);
    return data;
  },

  //임시저장에서 다시 임시저장
  saveTempToTemp: async (tempId, title, content) => {
    let req = {
      "title": title,
      "content": content
    };
    const data = await instance.put(`api/mytemporary/${tempId}`, req);
    return data;
  },

  //비로그인한 사용자 게시글 조회
  getNotLoginUserDiary: async () => {
    const data = await instance.get('/api/posts/anonymous');
    return data;
  },

  //비로그인한 사용자 게시글 detail
  getNotLoginUserDetail: async () => {
    const data = await instance.get('/api/posts/anonymous/one');
    return data;
  }










};

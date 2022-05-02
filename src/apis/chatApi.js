import { instance } from "./config";

export const chatApi = {
    // 채팅방 생성
    createChat: async (roomname, userId) => {
        let req = {
            roomname: roomname,
            userId: userId,
        };
        const data = await instance.post("/api/rooms", req);
        return data;
    },

    getChatList: async () => {
        const data = await instance.get("/api/rooms");
        return data;
    },

    // 채팅방(chat) 이전 메시지 조회
    getChatMessage: async (roomId) => {
        const data = await instance.get(`/api/rooms/${roomId}/messages`);
        return data;
    },

    // 채팅방(chat) 삭제
    deleteChat: async (roomId) => instance.delete(`/api/rooms/${roomId}`),
};

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

    // 채팅방 리스트 조회
    getChatList: async (page) => {
        const data = await instance.get(`/api/rooms/${page}`);
        return data;
    },

    // 채팅방 입장
    enterChatRoom: async (roomUuid) => {
        const data = await instange.get(`/api/rooms/otherUserInfo/${roomUuid}`);
        return data;
    },

    // 채팅방(chat) 이전 메시지 조회
    getChatMessage: async (roomId) => {
        const data = await instance.get(`/api/rooms/${roomId}/messages`);
        return data;
    },

    // 채팅방(chat) 나가기
    deleteChat: async (roomId) => {
        const data = await instance.delete(`/api/rooms/${roomId}`);
        return data;
    },
};

import { instance } from "./config";

export const chatApi = {
  // chatlist 조회
  getChatList: () => instance.get("/api/rooms"),

  // 채팅방(chat) 이전 메시지 조회
  getChatMessage: (roomId) => instance.get(`/api/rooms/${roomId}/messages`),

  // 채팅방(chat) 삭제
  deleteChat: (roomId) => instance.delete(`/api/rooms/${roomId}`),
};

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../../apis/chatApi";

// 이니셜스테이트
const initialState = {
    messages: [],
    chatList: [],
    unreadCount: [],
};

// 참고용 chatList 요소 초기값
const inicialchatList = {
    charRoomUuid: null,
    createAt: null,
    dayBefore: null,
    lastMessage: null,
    roomName: null,
    unreadCount: null, // user 가 안 읽은 메시지 수. 실시간 값 넣어야 함.
};

// tooklit - thunk 사용 시 아래처럼 사용
export const getChatList = createAsyncThunk("GET_CHAT_LIST", async (page, thunkAPI) => {
    try {
        const response = chatApi.getChatList(page);
        console.log(response);
        return response;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const getChatMessage = createAsyncThunk("GET_CHAT_MESSAGE", async (roomId, thunkAPI) => {
    try {
        const response = chatApi.getChatMessage(roomId);
        console.log(response);
        return response;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

// 리듀서
const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        subMessage(state, action) {
            console.log(action.payload);
            state.messages.push(action.payload);
        },
        // 사이트에 체류 중 새로운 채팅 메시지를 받으면 리덕스에 저장
        getUnreadCount(state, action) {
            console.log(action.payload);
            state.unreadCount.push(action.payload);
        },
        // chatList 메뉴 클릭 시 해당 액션이 실행되게 하여 별 표시를 삭제하게 한다
        deleteUnreadCount(state, action) {
            state.unreadCount = [];
        },
    },
    // extraReducers
    extraReducers: (builder) => {
        builder.addCase(getChatMessage.fulfilled, (state, action) => {
            state.messages = action.payload.data;
        });
        builder.addCase(getChatList.fulfilled, (state, action) => {
            state.chatList = action.payload;
        });
    },
});

//액션 생성함수
export const { subMessage, getUnreadCount, deleteUnreadCount } = chatSlice.actions;

export default chatSlice.reducer;

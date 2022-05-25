import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../../apis/chatApi";
import { useDispatch } from "react-redux";

const initialState = {
    messages: [],
    chatList: [],
    unreadCountList: [],
    isLoading: true,
    hasNext: false,
    page: 1,
};

// tooklit - thunk 사용
export const getChatList = createAsyncThunk("GET_CHAT_LIST", async (page, thunkAPI) => {
    try {
        const response = await chatApi.getChatList(page);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const getChatMessage = createAsyncThunk("GET_CHAT_MESSAGE", async (roomId, thunkAPI) => {
    try {
        const response = await chatApi.getChatMessage(roomId);
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
            state.messages.push(action.payload);
        },
        // 새로운 채팅 메시지를 받으면 리덕스에 저장
        getUnreadCount(state, action) {
            const findSameRoomId = (u) => {
                return u.roomId === action.payload.roomId;
            };

            const unreadCountIndex = state.unreadCountList.findIndex(findSameRoomId);

            // 1. 해당 roomId를 가지고 있는 요소가 배열에 있으면
            if (unreadCountIndex !== -1) {
                // 1) 그 요소의 unreadCount 값을 업데이트하고
                state.unreadCountList[unreadCountIndex] = action.payload;

                // 2) chatList에서 해당 roomId 를 가지고 있는 요소를 찾아, 그 요소가 있는 경우 해당 요소의 unreadCount를 update
                const unReadRoom = state.chatList.find((c) => c.chatRoomUuid === action.payload.roomId);
                if (unReadRoom) {
                    unReadRoom.unreadCount = action.payload.unreadCount;
                }
            }

            // 2. 해당 roomId 를 가지고 있는 요소가 배열에 없으면
            else {
                // 1) newAlert를 unreadCountList 배열에 더하고
                state.unreadCountList.push(action.payload);

                // 2) chatList에서 해당 roomId 를 가지고 있는 요소를 찾아, 그 요소가 있는 경우 해당 요소의 unreadCount를 update
                const unReadRoom = state.chatList.find((c) => c.chatRoomUuid === action.payload.roomId);
                if (unReadRoom) {
                    unReadRoom.unreadCount = action.payload.unreadCount;
                }
            }
        },
        // chatList 메뉴 클릭 시 해당 액션이 실행되게 하여 별 표시를 삭제하게 한다
        deleteUnreadCount(state, action) {
            state.unreadCountList = [];
        },
        isLoading(state, action) {
            state.isLoading = true;
        },
        deleteChatList(state, action) {
            state.chatList = state.chatList.filter((chat) => chat.chatRoomUuid !== action.payload);
        },
    },

    // extraReducers
    extraReducers: (builder) => {
        builder.addCase(getChatMessage.fulfilled, (state, action) => {
            state.messages = action.payload.data;
        });
        builder.addCase(getChatList.fulfilled, (state, action) => {
            if (state.page === 1) {
                state.chatList = action.payload;
            } else if (state.page !== 1) {
                state.chatList.push(action.payload);
            }
            state.isLoading = false;
            if (action.payload.length < 10) {
                state.hasNext = false;
            } else {
                state.hasNext = true;
                state.page += 1;
            }
        });
    },
});

//액션 생성함수
export const { subMessage, getUnreadCount, deleteUnreadCount, deleteChatList } = chatSlice.actions;

export default chatSlice.reducer;

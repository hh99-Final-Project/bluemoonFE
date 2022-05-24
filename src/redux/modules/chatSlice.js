import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../../apis/chatApi";
import { useDispatch } from "react-redux";

// 이니셜스테이트
const initialState = {
    messages: [],
    chatList: [],
    unreadCountList: [],
    isLoading: true,
    hasNext: false,
    page: 1,
};

// 참고용 chatList 요소 초기값
// const inicialchatList = {
//     charRoomUuid: null,
//     createAt: null,
//     dayBefore: null,
//     lastMessage: null,
//     roomName: null,
//     unreadCount: null, // user 가 안 읽은 메시지 수. 실시간 값 넣어야 함.
// };

// const dispatch = useDispatch();

// tooklit - thunk 사용 시 아래처럼 사용
export const getChatList = createAsyncThunk("GET_CHAT_LIST", async (page, thunkAPI) => {
    // dispatch(isLoading());
    try {
        const response = await chatApi.getChatList(page);
        console.log(response);
        return response.data;
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
            state.messages.push(action.payload);
        },
        // 새로운 채팅 메시지를 받으면 리덕스에 저장
        getUnreadCount(state, action) {
            const findSameRoomId = (u) => {
                return u.roomId === action.payload.roomId;
            };

            const unreadCountIndex = state.unreadCountList.findIndex(findSameRoomId);

            // 해당 roomId에 대한 값이 배열에 있으면 해당 요소의 unreadCount 값 업데이트
            if (unreadCountIndex !== -1) {
                state.unreadCountList[unreadCountIndex] = action.payload;

                // chatList에서 같은 roomId 를 가지고 있는 요소 찾아, 그 요소의 unreadCount update
                // const findRoom = (c) => {
                //     if (c.chatRoomUuid == action.payload.roomId) {
                //         return true;
                //     }
                // };
                // state.chatList.find(findRoom).unreadCount = action.payload.unreadCount;

                const unReadRoom = state.chatList.find((c) => c.chatRoomUuid === action.payload.roomId);
                if (unReadRoom) {
                    unReadRoom.unreadCount = action.payload.unreadCount;
                }
            }

            // 해당 roomId 에 대한 값이 배열에 없으면 newAlert를 배열에 더하기
            else {
                state.unreadCountList.push(action.payload);

                // chatList에서 같은 roomId 를 가지고 있는 요소 찾아, 그 요소의 unreadCount update
                // const findRoom = (c) => {
                //     if (c.chatRoomUuid == action.payload.roomId) {
                //         return true;
                //     }
                // };
                // state.chatList.find(findRoom).unreadCount = action.payload.unreadCount;

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

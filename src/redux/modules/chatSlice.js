import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../../apis/chatApi";

// 이니셜스테이트
const initialState = {
    messages: [],
};

// tooklit - thunk 사용 시 아래처럼 사용
export const getChatMessage = createAsyncThunk("GET_CHAT_MESSAGE", async (arg, thunkAPI) => {
    try {
        const response = chatApi.getChatMessage();
        return response;
        console.log(response);
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
    },
    // extraReducers 뭐에 쓰는건지 아직 잘 모르겠음.
    extraReducers: (builder) => {
        builder.addCase(getChatMessage.fulfilled, (state, action) => {
            state.messages = action.payload;
        });
    },
});

//액션 생성함수
export const { subMessage } = chatSlice.actions;

export default chatSlice.reducer;

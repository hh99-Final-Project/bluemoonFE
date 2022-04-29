import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 이니셜스테이트
const initialState = {
  rooms: [],
  messages: [],
};

// tooklit - thunk 사용 시 아래처럼 사용
export const getChatMessageDB = createAsyncThunk(
  "GET_CHAT_MESSAGE",
  async (arg, thunkAPI) => {
    try {
      const response = await axios.get("http://121.139.34.35:8080");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// 리듀서
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getChatList(state, action) {
      state.rooms = action.payload;
    },
    getChatMessage(state, action) {
      state.messages = action.payload;
    },
  },

  // extraReducers 뭐에 쓰는건지 아직 잘 모르겠음.
  //   extraReducers: (builder) => {
  //     builder.addCase(getChatMessageDB.fulfilled, (state, action) => {
  //         state.info = action.payload
  //     })
  // },
});

//액션 생성함수
export const { getChatMessage } = chatSlice.actions;

export default chatSlice.reducer;

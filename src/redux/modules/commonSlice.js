import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//이니셜스테이트
const initialState = {
    isModalOpen: false,
    loginPath: "/",
    info: null,
    newCommentAlert: [],
    unreadAlert: [],
    commentAlertList: [],
};

//toolkit - thunk 사용할 때 아래처럼 사용한다.
export const getInfo = createAsyncThunk("GET_INFO", async (arg, thunkAPI) => {
    try {
        const response = await axios.get("https://run.mocky.io/v3/c4a9c621-ec5e-4505-9f32-d69510d27871");
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

//리듀서
const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setLoginModalOpen(state, action) {
            state.isModalOpen = action.payload.open;
            state.loginPath = action.payload.path ? action.payload.path : "/";
        },
        getNewCommentAlert(state, action) {
            // 배열의 가장 앞에 실시간 알람 메시지를 추가
            state.newCommentAlert.unshift(action.payload);
        },
        deleteNewCommentAlert(state, action) {
            // 알람 아이콘 클릭했을 시 newCommentAlert 배열을 초기화
            state.newCommentAlert = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInfo.fulfilled, (state, action) => {
            state.info = action.payload;
        });
    },
});

//액션 생성함수
export const { setLoginModalOpen, getNewCommentAlert, deleteNewCommentAlert } = commonSlice.actions;

//리듀서 export
export default commonSlice.reducer;

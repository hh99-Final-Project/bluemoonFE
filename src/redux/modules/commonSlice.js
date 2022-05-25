import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//이니셜스테이트
const initialState = {
    modalIsOpen: false,
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
        isModalOpen(state, action) {
            state.modalIsOpen = action.payload;
        },
        getAlertList(state, action) {
            // 배열에 이전 알람 메시지 추가 (리듀서에서 처리 여부 고민중)
            // state.commentAlertList.push(...action.payload);
        },
        getNewCommentAlert(state, action) {
            // 배열의 가장 앞에 실시간 알람 메시지를 추가
            state.newCommentAlert.unshift(action.payload);
            // state.commentAlertList.unshift(action.payload); //(리듀서에서 처리 여부 고민중)
        },
        deleteNewCommentAlert(state, action) {
            // 알람 아이콘 클릭했을 시
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
export const { isModalOpen, getAlertList, getNewCommentAlert, deleteNewCommentAlert } = commonSlice.actions;

//리듀서 export
export default commonSlice.reducer;

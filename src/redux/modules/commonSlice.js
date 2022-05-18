import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//이니셜스테이트
const initialState = {
    modalIsOpen: false,
    info: null,
    alertList: [],
    unreadAlert: [],
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
            // 배열에 실시간 알람 메시지 추가
            state.alertList.push(action.payload);
        },
        getNewAlert(state, action) {
            console.log(action.payload);
            // 배열의 가장 앞에 실시간 알람 메시지를 추가함
            state.alertList.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInfo.fulfilled, (state, action) => {
            state.info = action.payload;
        });
    },
});

//액션 생성함수
export const { isModalOpen, getAlertList, getNewAlert } = commonSlice.actions;

//리듀서 export
export default commonSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//이니셜스테이트
const initialState = {
    modalIsOpen: false,
    info: null,
    alertList: [],
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
            console.log(action.payload);
            state.alertList.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInfo.fulfilled, (state, action) => {
            state.info = action.payload;
        });
    },
});

//액션 생성함수
export const { isModalOpen, getAlertList } = commonSlice.actions;

//리듀서 export
export default commonSlice.reducer;

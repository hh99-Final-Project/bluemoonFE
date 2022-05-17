import { createSlice } from "@reduxjs/toolkit";

//이니셜스테이트
const initialState = {
    error: {}
};


//리듀서
const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        showError(state, action) {
            state.error = action.payload;
        },
    }
});

//액션 생성함수
export const { showError } = errorSlice.actions;

//리듀서 export
export default errorSlice.reducer;
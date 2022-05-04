import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userApi } from "../../apis/userApi";

const initialState = {
    isLogin: false,
    userInfo: null
};

//toolkit - thunk (비동기 처리를 여기서 하고 싶을때 사용)
export const loginCheck = createAsyncThunk("LOGIN_CHECK", async() => {
    try {
        const response = userApi.isLogin()
        return response;
    } catch (e) {
        // return null;
        return thunkAPI.rejectWithValue(await e.response.data)
    }

})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        isLogined(state, action){
            state.isLogin = action.payload;
        },
        getUserInfo(state,action){
            state.userInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginCheck.fulfilled, (state, action) => {
            state.userInfo = action.payload
            state.isLogin = true;
        })
    },
})

// Action creators are generated for each case reducer function
export const { isLogined, getUserInfo } = userSlice.actions

export default userSlice.reducer
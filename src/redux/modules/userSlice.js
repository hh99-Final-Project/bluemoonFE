import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    userInfo: null
};

//toolkit - thunk (비동기 처리를 여기서 하고 싶을때 사용)
// export const getInfo = createAsyncThunk("GET_INFO", async() => {
//     try {
//         const response = await axios.get("https://run.mocky.io/v3/c4a9c621-ec5e-4505-9f32-d69510d27871");
//         return response.data;
//     } catch (e) {
//         // return null;
//         return thunkAPI.rejectWithValue(await e.response.data)
//     }

// })

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        isLogin(state, action){
            state.isLogin = action.payload;
        },
        getUserInfo(state,action){
            state.userInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(getInfo.fulfilled, (state, action) => {
        // state.info = action.payload
        // })
    },
})

// Action creators are generated for each case reducer function
export const { isLogin, getUserInfo } = userSlice.actions

export default userSlice.reducer
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import commonSlice from './commonSlice';
import chatSlice from './chatSlice';
import diarySlice from './diarySlice';


const reducer = (state, action) => {
    return combineReducers({
        userSlice,
        commonSlice,
        chatSlice,
        diarySlice
    })(state, action);
}

export default reducer;
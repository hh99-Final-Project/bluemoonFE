import { combineReducers } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import commonSlice from './commonSlice';
import chatSlice from './chatSlice';
import postSlice from './postSlice';


const reducer = (state, action) => {
    return combineReducers({
        userSlice,
        commonSlice,
        chatSlice,
        postSlice
    })(state, action);
}

export default reducer;
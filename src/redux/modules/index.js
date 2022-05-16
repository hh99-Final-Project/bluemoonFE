import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import commonSlice from "./commonSlice";
import chatSlice from "./chatSlice";


const reducer = (state, action) => {
    return combineReducers({
        userSlice,
        commonSlice,
        chatSlice,
    })(state, action);
};

export default reducer;
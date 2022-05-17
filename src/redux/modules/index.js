import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import commonSlice from "./commonSlice";
import chatSlice from "./chatSlice";
import errorSlice from "./errorSlice";


const reducer = (state, action) => {
    return combineReducers({
        userSlice,
        commonSlice,
        chatSlice,
        errorSlice
    })(state, action);
};

export default reducer;
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./modules";
import logger from "redux-logger";

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV === "development"
});
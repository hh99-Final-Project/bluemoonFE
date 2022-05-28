import { configureStore } from "@reduxjs/toolkit";
import reducer from "./modules";
import logger from "redux-logger";

export const store = configureStore({
    reducer,
    middleware: process.env.NODE_ENV === "development" ? (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(logger) : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV === "development"
});
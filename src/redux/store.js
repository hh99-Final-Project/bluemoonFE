import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./modules";
import logger from "redux-logger";

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production"
});
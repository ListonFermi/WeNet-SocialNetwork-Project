"use client";
import { Middleware, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import socketReducer from "./socketSlice";
import { socketMiddleware } from "./socketMiddleware";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

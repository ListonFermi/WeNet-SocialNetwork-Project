"use client"
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import postReducer from './postSlice'
// import adminReducer from "./adminSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        post : postReducer
    }
})
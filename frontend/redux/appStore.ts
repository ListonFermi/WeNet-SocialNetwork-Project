"use client";
import { Middleware, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import socketReducer from "./socketSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    socket: socketReducer,
  },
});

// dispatch( verifyUser()  )

// const h= useSelector( (s)=>store  )
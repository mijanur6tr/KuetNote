import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./authSlice";
import postSlice from "./postSlice";
import commentSlice from "./commentSlice";

const store = configureStore(
    {
        reducer :{
            auth: authSlice,
            posts: postSlice,
            comments: commentSlice,
        }
    }
)

export default store;
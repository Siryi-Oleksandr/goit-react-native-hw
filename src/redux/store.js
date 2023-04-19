import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice, authReducer } from "./auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  //   posts: postsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

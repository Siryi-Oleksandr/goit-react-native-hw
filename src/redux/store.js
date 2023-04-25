import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/authSlice";
import { postsReducer } from "./posts/postsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

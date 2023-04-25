import { createSlice } from "@reduxjs/toolkit";
import { db, storage } from "../../firebase/config";
import { addPost } from "./postsOperations";

const handlePending = (state) => {
  state.isRefresing = true;
  state.textError = null;
};

const handleRejected = (state, action) => {
  state.isRefresing = false;
  state.textError = action.payload;
};

const state = {
  userPosts: [],
  comments: [],
  curentPost: null,
  isRefresing: false,
  textError: null,
};

export const postsSlice = createSlice({
  // Ім'я слайсу
  name: "posts",
  // Початковий стан редюсера слайсу
  initialState: state,
  // Об'єкт редюсерів
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => handlePending(state))
      .addCase(addPost.fulfilled, (state, action) => {
        state.isRefresing = false;
        state.userPosts.push(action.payload);
        state.comments = [];
      })
      .addCase(addPost.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addDefaultCase((state) => state);
  },
});

export const postsReducer = postsSlice.reducer;
// export const { setStateChangeUser } = authSlice.actions;

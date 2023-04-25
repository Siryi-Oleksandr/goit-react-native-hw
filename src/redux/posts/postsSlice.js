import { createSlice } from "@reduxjs/toolkit";
import { addComment, addPost, getPosts } from "./postsOperations";

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
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.isRefresing = false;
        state.userPosts.push(payload);
        // state.comments = [];
      })
      .addCase(addPost.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(getPosts.pending, (state) => handlePending(state))
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.isRefresing = false;
        state.userPosts = payload;
        // state.comments = [];
      })
      .addCase(getPosts.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(addComment.pending, (state) => handlePending(state))
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.isRefresing = false;
        state.comments.push(payload);
        // state.comments = [];
      })
      .addCase(addComment.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addDefaultCase((state) => state);
  },
});

export const postsReducer = postsSlice.reducer;
// export const { setStateChangeUser } = authSlice.actions;

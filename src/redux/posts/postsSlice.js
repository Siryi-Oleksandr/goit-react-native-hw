import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  addPost,
  getAllPosts,
  getComents,
  getLikes,
  getPosts,
  toggleLike,
} from "./postsOperations";

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
  allPosts: [],
  comments: [],
  likes: [],
  isRefresing: false,
  textError: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState: state,
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => handlePending(state))
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.isRefresing = false;
        state.userPosts.push(payload);
      })
      .addCase(addPost.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(getAllPosts.pending, (state) => handlePending(state))
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.isRefresing = false;
        state.allPosts = payload;
      })
      .addCase(getAllPosts.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(getPosts.pending, (state) => handlePending(state))
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.isRefresing = false;
        state.userPosts = payload;
      })
      .addCase(getPosts.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(addComment.pending, (state) => handlePending(state))
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.isRefresing = false;
        state.comments.push(payload);
      })
      .addCase(addComment.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(getComents.pending, (state) => handlePending(state))
      .addCase(getComents.fulfilled, (state, { payload }) => {
        state.isRefresing = false;
        state.comments = payload;
      })
      .addCase(getComents.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(toggleLike.pending, (state) => handlePending(state))
      .addCase(toggleLike.fulfilled, (state, { payload }) => {
        state.isRefresing = false;
        // state.likes.push(payload);
      })
      .addCase(toggleLike.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(getLikes.pending, (state) => handlePending(state))
      .addCase(getLikes.fulfilled, (state, { payload }) => {
        state.isRefresing = false;
        state.likes.push(payload);
      })
      .addCase(getLikes.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addDefaultCase((state) => state);
  },
});

export const postsReducer = postsSlice.reducer;

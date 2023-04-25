import { createSlice } from "@reduxjs/toolkit";
import { db, storage } from "../../firebase/config";

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
  extraReducers: {},
});

export const postsReducer = postsSlice.reducer;
// export const { setStateChangeUser } = authSlice.actions;

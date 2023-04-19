import { createSlice } from "@reduxjs/toolkit";
import { authSignUp } from "./authOperations";

export const authSlice = createSlice({
  // Ім'я слайсу
  name: "auth",
  // Початковий стан редюсера слайсу
  initialState: {
    userId: null,
    name: null,
    email: null,
  },
  // Об'єкт редюсерів
  extraReducers: {
    [authSignUp.fulfilled](state, { payload }) {
      return {
        ...state,
        userId: payload.uid,
        email: payload.email,
      };
    },
  },
});

export const authReducer = authSlice.reducer;
export const { updateUserProfile } = authSlice.actions;

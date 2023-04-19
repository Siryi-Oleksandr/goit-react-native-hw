import { createSlice } from "@reduxjs/toolkit";
import { authLogIn, authSignUp } from "./authOperations";

export const authSlice = createSlice({
  // Ім'я слайсу
  name: "auth",
  // Початковий стан редюсера слайсу
  initialState: {
    userId: null,
    name: null,
    email: null,
    isAuth: false,
  },
  // Об'єкт редюсерів
  extraReducers: {
    [authSignUp.fulfilled](state, { payload }) {
      return {
        ...state,
        userId: payload.uid,
        name: payload.displayName,
        email: payload.email,
        isAuth: true,
      };
    },

    [authLogIn.fulfilled](state, { payload }) {
      return {
        ...state,
        userId: payload.uid,
        name: payload.displayName,
        email: payload.email,
        isAuth: true,
      };
    },
  },
});

export const authReducer = authSlice.reducer;
export const { updateUserProfile } = authSlice.actions;

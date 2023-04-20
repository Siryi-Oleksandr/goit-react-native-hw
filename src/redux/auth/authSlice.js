import { createSlice } from "@reduxjs/toolkit";
import {
  authLogIn,
  authLogOut,
  authSignUp,
  authStateChangeUser,
} from "./authOperations";

const handlePending = (state) => {
  state.isAuth = false;
  state.isError = false;
  state.textError = null;
  state.userId = null;
  state.name = null;
  state.email = null;
};

const handleRejected = (state, action) => {
  state.isAuth = false;
  state.isError = true;
  state.textError = action.payload;
  state.userId = null;
  state.name = null;
  state.email = null;
};

export const authSlice = createSlice({
  // Ім'я слайсу
  name: "auth",
  // Початковий стан редюсера слайсу
  initialState: {
    userId: null,
    name: null,
    email: null,
    isAuth: false,
    isRefresing: false,
    isError: false,
    textError: null,
  },
  // Об'єкт редюсерів
  extraReducers: {
    // *** SignUp User
    [authSignUp.pending]: handlePending,
    [authSignUp.fulfilled](state, { payload }) {
      return {
        ...state,
        userId: payload.uid,
        name: payload.displayName,
        email: payload.email,
        isAuth: true,
      };
    },
    [authSignUp.rejected]: handleRejected,

    // *** LogIn User
    [authLogIn.pending]: handlePending,
    [authLogIn.fulfilled](state, { payload }) {
      return {
        ...state,
        userId: payload.uid,
        name: payload.displayName,
        email: payload.email,
        isAuth: true,
      };
    },
    [authLogIn.rejected]: handleRejected,

    // *** LogOut User
    [authLogOut.pending](state, action) {
      state.isError = false;
      state.textError = null;
    },
    [authLogOut.fulfilled](state) {
      state.userId = null;
      state.name = null;
      state.email = null;
      state.isAuth = false;
      state.isError = false;
      state.textError = null;
    },
    [authLogOut.rejected](state, action) {
      state.isError = true;
      state.textError = action.payload;
    },

    // *** change User
    [authStateChangeUser.fulfilled](state, { payload }) {
      return {
        ...state,
        isAuth: payload,
      };
    },
  },
});

export const authReducer = authSlice.reducer;

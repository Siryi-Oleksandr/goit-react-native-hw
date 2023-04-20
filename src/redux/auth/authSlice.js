import { createSlice } from "@reduxjs/toolkit";
import { authLogIn, authLogOut, authSignUp } from "./authOperations";

const handlePending = (state) => {
  state.isAuth = false;
  state.isError = false;
  state.textError = null;
  // state.user = {};
};

const handleRejected = (state, action) => {
  state.isAuth = false;
  state.isError = true;
  state.textError = action.payload;
  // state.user = {};
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

    [authLogOut.fulfilled](state) {
      state.userId = null;
      state.name = null;
      state.email = null;
      state.isAuth = false;
    },
  },
});

export const authReducer = authSlice.reducer;

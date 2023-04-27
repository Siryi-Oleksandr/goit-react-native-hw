import { createSlice } from "@reduxjs/toolkit";
import { authLogIn, authLogOut, authSignUp } from "./authOperations";

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

const state = {
  userId: null,
  name: null,
  email: null,
  isAuth: false,
  isRefresing: false,
  isError: false,
  textError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state) => handlePending(state))
      .addCase(authSignUp.fulfilled, (state, { payload }) => {
        return {
          ...state,
          userId: payload.uid,
          name: payload.displayName,
          email: payload.email,
          isAuth: true,
        };
      })
      .addCase(authSignUp.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(authLogIn.pending, (state) => handlePending(state))
      .addCase(authLogIn.fulfilled, (state, { payload }) => {
        return {
          ...state,
          userId: payload.uid,
          name: payload.displayName,
          email: payload.email,
          isAuth: true,
        };
      })
      .addCase(authLogIn.rejected, (state, action) =>
        handleRejected(state, action)
      )
      .addCase(authLogOut.pending, (state) => {
        state.isError = false;
        state.textError = null;
      })
      .addCase(authLogOut.fulfilled, () => {
        return state;
      })
      .addCase(authLogOut.rejected, (state, action) => {
        state.isError = true;
        state.textError = action.payload;
      })
      .addDefaultCase((state) => state);
  },
  // *** change User
  reducers: {
    setStateChangeUser: (state, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setStateChangeUser } = authSlice.actions;

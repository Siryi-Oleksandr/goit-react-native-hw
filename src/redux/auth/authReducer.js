import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  // Ім'я слайсу
  name: "auth",
  // Початковий стан редюсера слайсу
  initialState: {
    userId: null,
    nickName: null,
  },
  // Об'єкт редюсерів
  reducers: {
    // addTask(state, action) {
    //   state.push(action.payload);
    // },
    // deleteTask(state, action) {
    //   const index = state.findIndex((task) => task.id === action.payload);
    //   state.splice(index, 1);
    // },
  },
});

export const authReducer = authSlice.reducer;

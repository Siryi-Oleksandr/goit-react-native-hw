export const selectUserName = (state) => state.auth.name;
export const selectUserEmail = (state) => state.auth.email;
export const selectUserId = (state) => state.auth.userId;
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectIsError = (state) => state.auth.isError;
export const selectTextError = (state) => state.auth.textError;
export const selectIsRefresing = (state) => state.auth.isRefresing;

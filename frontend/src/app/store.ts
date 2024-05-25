import { configureStore } from "@reduxjs/toolkit";
import { noteApi } from "@/features/notes/noteApi";
import { userApi } from "@/features/users/userApi";
import { authApi } from "@/features/auth/authApi";
import authSlice from "@/features/auth/authSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    [noteApi.reducerPath]: noteApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      noteApi.middleware,
      userApi.middleware,
      authApi.middleware
    ),

  devTools: import.meta.env.VITE_ENV === "production" ? false : true,
});
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;

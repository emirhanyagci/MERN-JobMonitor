import { configureStore } from "@reduxjs/toolkit";
import { noteApi } from "@/features/notes/noteApi";
import { userApi } from "@/features/users/userApi";
export const store = configureStore({
  reducer: {
    [noteApi.reducerPath]: noteApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteApi.middleware, userApi.middleware),

  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "@/features/notes/notesSlice";
import { noteApi } from "@/features/notes/noteApi";
import { userApi } from "@/features/users/userApi";
export const store = configureStore({
  reducer: {
    [noteApi.reducerPath]: noteApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    notes: notesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteApi.middleware, userApi.middleware),

  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

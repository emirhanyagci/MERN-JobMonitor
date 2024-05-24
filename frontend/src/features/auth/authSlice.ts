import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null as null | string,
  },
  reducers: {
    setCredentials: (state, action) => {
      const accessToken = action.payload;
      console.log(accessToken);

      state.token = accessToken;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logOut } = authSlice.actions;
export const selectCurrentToken = (state: RootState) => state.auth.token;

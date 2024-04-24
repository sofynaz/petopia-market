import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialType = {
  auth: boolean;
  user: Record<string, any> | null;
};

const initialState: InitialType = {
  auth: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<InitialType["user"]>) {
      const { payload } = action;
      if (payload) {
        state.auth = true;
        state.user = payload;
      } else {
        state.auth = false;
        state.user = null;
      }
    },
    removeAuth(state) {
      state.auth = false;
      state.user = null;
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;

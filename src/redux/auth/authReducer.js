import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nickName: null,
    stateChange: null,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => {
      state.userId = payload.uid;
      state.nickName = payload.displayName;
    },
    updateStatusChange: (state, { payload }) => {
      state.stateChange = payload;
    },
  },
});

// Auth reducer slices are defined here...!

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    LOGIN_USER: (state, action) => {
      console.log("Auth reducer is hitting!");
    },
  },
});

export const { LOGIN_USER } = authSlice.actions;
export default authSlice.reducer;

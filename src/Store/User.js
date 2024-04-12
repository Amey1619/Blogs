import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});

export const { storeUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

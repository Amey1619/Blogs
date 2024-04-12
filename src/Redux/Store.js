import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Store/User";

export const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

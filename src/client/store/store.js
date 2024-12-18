import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/profileslice/Profile.slice";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

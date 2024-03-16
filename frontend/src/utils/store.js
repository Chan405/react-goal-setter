import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/authReducer";
import goalReducer from "../features/goals/goalReducer";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    goal: goalReducer,
  },
});

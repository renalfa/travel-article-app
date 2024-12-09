import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./articles/articleSlice";
import categoryReducer from "./categories/categorySlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    articles: articleReducer,
    categories: categoryReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

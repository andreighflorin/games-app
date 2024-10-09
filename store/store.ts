import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import gamesReducer from "./gamesSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    games: gamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

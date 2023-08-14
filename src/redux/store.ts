import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./filters/slice";
import { companiesReducer } from "./companies/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    companies: companiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

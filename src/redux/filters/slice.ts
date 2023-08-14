import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getLocalStorage } from "../../utils/localStorage";
import { FilterSliceState } from "../../types/types";

const initialState: FilterSliceState = {
  page: getLocalStorage("page") ? getLocalStorage("page") : 0,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { actions: filterActions, reducer: filterReducer } = filterSlice;

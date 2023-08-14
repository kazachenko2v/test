import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCompanies } from "./asyncActions";
import { getLocalStorage } from "../../utils/localStorage";
import { CompaniesSliceState, Company } from "../../types/types";

const initialState: CompaniesSliceState = {
  items: getLocalStorage("companies") ? getLocalStorage("companies") : [],
  status: "loading",
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.pending, (state, action) => {
      state.status = "loading";
      state.items = [];
    });

    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "completed";
    });

    builder.addCase(fetchCompanies.rejected, (state, action) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { actions: companiesActions, reducer: companiesReducer } =
  companiesSlice;

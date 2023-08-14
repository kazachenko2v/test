import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Company } from "../../types/types";

export const fetchCompanies = createAsyncThunk<Company[], number>(
  "companies/fetchCompaniesStatus",
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Company[]>(
        `https://api.iex.cloud/v1/data/core/company?first=10&token=${process.env.REACT_APP_TOKEN}`,
        {
          params: { offset: page },
        }
      );

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

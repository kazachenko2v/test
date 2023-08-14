import { RootState } from "../store";

export const getCompanies = (state: RootState) => state.companies.items;
export const getStatus = (state: RootState) => state.companies.status;

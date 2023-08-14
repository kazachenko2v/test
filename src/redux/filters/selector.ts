import { RootState } from "../store";

export const getPage = (state: RootState) => state.filter.page;

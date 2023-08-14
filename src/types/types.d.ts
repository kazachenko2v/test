export interface Company {
  symbol: string;
  companyName: strong;
  industry: string;
}

export interface FilterSliceState {
  page: number;
}

export interface CompaniesSliceState {
  items: Company[];
  status: string;
}

export type Order = "asc" | "desc";

export type EnhancedTableHeadProps = {
  order: Order;
  orderBy: keyof Company | null;
  onRequestSort: (string: keyof Company) => void;
};

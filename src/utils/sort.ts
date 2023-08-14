import { Company, Order } from "../types/types";

function descendingComparator(a: Company, b: Company, orderBy: keyof Company) {
  let first = a[orderBy];
  let second = b[orderBy];

  if (first === null) {
    first = "-";
  }
  if (second === null) {
    second = "-";
  }

  return first.localeCompare(second);
}

export function getComparator(order: Order, orderBy: keyof Company | null) {
  if (!orderBy) {
    return;
  }
  return order === "desc"
    ? (a: Company, b: Company) => descendingComparator(a, b, orderBy)
    : (a: Company, b: Company) => -descendingComparator(a, b, orderBy);
}

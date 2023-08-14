import React from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { SortDirection } from "@mui/material/TableCell";
import Box from "@mui/material/Box";

import { visuallyHidden } from "@mui/utils";

import { Company, EnhancedTableHeadProps } from "../types/types";

const headCells = [
  {
    id: "symbol",
    label: "Symbol",
  },
  {
    id: "companyName",
    label: "Company Name",
  },
  {
    id: "industry",
    label: "Industry",
  },
];

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = ({
  order,
  orderBy,
  onRequestSort,
}) => {
  const createSortHandler = (property: keyof Company) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead className="bg-slate-200">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={"normal"}
            sortDirection={
              (orderBy === headCell.id ? order : false) as
                | SortDirection
                | undefined
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={(orderBy === headCell.id ? order : "asc") as any}
              onClick={createSortHandler(headCell.id as keyof Company)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default EnhancedTableHead;

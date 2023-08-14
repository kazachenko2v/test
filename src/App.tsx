import React, { useEffect, useMemo } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { useAppDispatch } from "./redux/store";
import { filterActions } from "./redux/filters/slice";
import { getPage } from "./redux/filters/selector";
import { companiesActions } from "./redux/companies/slice";
import { getCompanies, getStatus } from "./redux/companies/selectors";
import { fetchCompanies } from "./redux/companies/asyncActions";

import { useActionCreators } from "./hooks/useActionCreators";
import { setLocalStorage } from "./utils/localStorage";
import { getItemStyle, reorder } from "./utils/dragAndDrop";
import { Company, Order } from "./types/types";

import EnhancedTableHead from "./components/EnhancedTableHead";
import { getComparator } from "./utils/sort";
import ButtonContainer from "./components/ButtonContainer";

const App = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Company | null>(null);

  const dispatch = useAppDispatch();

  const page = useSelector(getPage);
  const companies = useSelector(getCompanies);
  const status = useSelector(getStatus);

  const pagesActions = useActionCreators(filterActions);
  const itemsActions = useActionCreators(companiesActions);

  useEffect(() => {
    dispatch(fetchCompanies(page));
  }, [page]);

  const handleRequestSort = (property: keyof Company) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    itemsActions.setCompanies(
      [...companies].sort(getComparator(order, orderBy))
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (status === "completed") {
      itemsActions.setCompanies(
        reorder(companies, result.source.index, result.destination.index)
      );
    }
  };

  const setPage = (newPage: number) => {
    setLocalStorage("page", newPage);
    pagesActions.setPage(newPage);
  };

  if (status === "error") return <div>error!</div>;

  return (
    <div className="flex flex-col h-screen justify-between p-3">
      {status === "loading" ? (
        <div className="flex-1 grid justify-center content-center">
          <CircularProgress className="" />
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <TableContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Table
                  className="rounded-lg overflow-hidden"
                  aria-labelledby="tableTitle"
                  size={"medium"}
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody className="grid grid-cols-3 gap-3.5">
                    {companies.map((company, index) => (
                      <Draggable
                        key={company.symbol}
                        draggableId={company.symbol}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TableRow
                            hover
                            key={company.symbol}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <TableCell className="w-2/12">
                              {company.symbol}
                            </TableCell>
                            <TableCell className="w-5/12">
                              {company.companyName}
                            </TableCell>
                            <TableCell className="w-5/12">
                              {company.industry ? company.industry : "-----"}
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    <TableRow>{provided.placeholder}</TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <ButtonContainer status={status} page={page} setPage={setPage} />
    </div>
  );
};

export default App;

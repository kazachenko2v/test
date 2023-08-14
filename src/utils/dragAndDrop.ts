import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { Company } from "../types/types";

export const reorder = (
  list: Company[],
  startIndex: number,
  endIndex: number
): Company[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  display: isDragging ? "flex" : "",
  ...draggableStyle,
});

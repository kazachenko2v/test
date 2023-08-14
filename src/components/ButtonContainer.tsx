import { Button } from "@mui/material";
import React from "react";

interface ButtonContainerProps {
  status: string;
  page: number;
  setPage: (newPage: number) => void;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  status,
  page,
  setPage,
}) => {
  return (
    <div className="flex justify-end gap-8 p-7">
      <Button
        variant="outlined"
        disabled={page < 1 || status === "loading"}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </Button>
      <Button
        disabled={status === "loading"}
        variant="outlined"
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default ButtonContainer;

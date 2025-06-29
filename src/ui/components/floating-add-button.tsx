import Add from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";

interface FloatingAddButtonProps {
  to: string;
}

export function FloatingAddButton({ to }: FloatingAddButtonProps) {
  const navigate = useNavigate();

  return (
    <Fab color="success" sx={{
      position: "fixed",
      bottom: "2em",
      right: "2em",
    }} onClick={() => navigate(to)} aria-label="add-button">
      <Add />
    </Fab>
  );
}

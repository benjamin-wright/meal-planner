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
      bottom: "1em",
      right: "1em",
    }} onClick={() => navigate(to)}>
      <Add />
    </Fab>
  );
}
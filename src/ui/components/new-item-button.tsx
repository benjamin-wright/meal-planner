import Add from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";

interface NewItemButtonProps {
  to: string;
}

export function NewItemButton({ to }: NewItemButtonProps) {
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
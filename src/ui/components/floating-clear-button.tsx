import { Clear } from "@mui/icons-material";
import Fab from "@mui/material/Fab";

interface FloatingClearButtonProps {
  onClick?: () => void;
}

export function FloatingClearButton({ onClick }: FloatingClearButtonProps) {
  return (
    <Fab color="error" sx={{
      position: "fixed",
      bottom: "2em",
      left: "2em",
    }} onClick={onClick}>
      <Clear />
    </Fab>
  );
}

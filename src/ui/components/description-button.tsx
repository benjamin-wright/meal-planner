import { Button, Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";

interface DescriptionButtonProps {
  children: React.ReactNode;
  text: string;
  color?: "success" | "error";
  onClick: () => void;
}

export function DescriptionButton({ children, text, color, onClick } : DescriptionButtonProps) {
  return <Card variant="outlined" sx={{
    padding: "0.25em",
    display: "flex",
    flexDirection: "column",
    gap: "0.5em",
  }}>
    <Typography>{ children }</Typography>
    <Button variant="contained" color={color || "success"} onClick={onClick}>{ text }</Button>
  </Card>
}
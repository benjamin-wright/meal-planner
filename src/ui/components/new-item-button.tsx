import Add from "@mui/icons-material/Add";
import { SxProps } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";

interface NewItemButtonProps {
  onClick: () => void;
  sx?: SxProps;
  small?: boolean;
  disabled?: boolean;
}

export function NewItemButton({ onClick, sx, small, disabled }: NewItemButtonProps) {
  return (
    <Card
      sx={{
        overflow: "unset",
        ...sx
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          padding: small ? "0.5em 1.5em" : "1.5em",
          textAlign: "center",
          opacity: disabled ? 0.3 : 1,
        }}
        disabled={disabled}
      >
        <Add />
      </CardActionArea>
    </Card>
  );
}
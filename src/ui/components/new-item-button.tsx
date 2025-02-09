import Add from "@mui/icons-material/Add";
import { SxProps } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";

interface NewItemButtonProps {
  onClick: () => void;
  sx?: SxProps;
  small?: boolean;
}

export function NewItemButton({ onClick, sx, small }: NewItemButtonProps) {
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
        }}
      >
        <Add />
      </CardActionArea>
    </Card>
  );
}
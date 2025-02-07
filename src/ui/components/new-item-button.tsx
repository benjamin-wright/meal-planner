import Add from "@mui/icons-material/Add";
import { SxProps } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";

interface NewItemButtonProps {
  onClick: () => void;
  sx?: SxProps;
}

export function NewItemButton({ onClick, sx }: NewItemButtonProps) {
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
          padding: "1.5em",
          textAlign: "center",
        }}
      >
        <Add />
      </CardActionArea>
    </Card>
  );
}
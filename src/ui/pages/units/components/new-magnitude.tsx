import Add from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";

interface NewMagnitudeProps {
  onNewMagnitude: () => void;
}

export function NewMagnitude({ onNewMagnitude }: NewMagnitudeProps) {
  return (
    <Card
      sx={{
        overflow: "unset",
      }}
    >
      <CardActionArea
        onClick={onNewMagnitude}
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
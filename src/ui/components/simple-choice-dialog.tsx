import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

type Choice = {
  name: string;
  icon: ReactNode;
}

interface SimpleChoiceDialogProps {
  open: boolean;
  choices: Choice[];
  onClose: (choice?: string) => void;
}

export function SimpleChoiceDialog({ open, choices, onClose }: SimpleChoiceDialogProps) {
  return <Dialog open={open} onClose={() => onClose()}>
    <DialogContent sx={{
      display: "grid",
      gridTemplateColumns: `repeat(${choices.length}, 1fr)`,
      gap: "1em",
      padding: "1em",
    }}>
      {choices.map((choice, index) => (
        <Card key={index}>
          <CardActionArea onClick={() => onClose(choice.name)} sx={{
            fontSize: "1em",
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1em",
          }}>
            {choice.icon}
            <Typography textTransform="capitalize">{choice.name}</Typography>
          </CardActionArea>
        </Card>
      ))}
    </DialogContent>
  </Dialog>
}
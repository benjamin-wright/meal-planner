import { Box, Card } from "@mui/material";

interface ProgressTrackerStep {
  display: string;
  completed: boolean;
}

interface ProgressTrackerProps {
  active: number;
  steps: ProgressTrackerStep[];
  onSelected?: (selected: number) => void;
}

export function ProgressTracker({ active, steps, onSelected }: ProgressTrackerProps) {
  return <Box display="flex" flexDirection="row" justifyContent="space-between">
    {
      steps.map((step, index) => {
        return <Card
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            width: "2.5em",
            height: "2.5em",
            textTransform: "capitalize",
            backgroundColor: index === active ? "primary.light" : step.completed ? "success.main" : "secondary.dark",
            color: index === active ? "primary.dark" : step.completed ? "success.contrastText" : "secondary.contrastText",
          }}
          onClick={() => onSelected && onSelected(index)}
        >{step.display}</Card>
      })
    }
  </Box>;
}

import { Box } from "@mui/material";

interface ProgressTrackerStep {
  display: string;
  completed: boolean;
}

interface ProgressTrackerProps {
  steps: ProgressTrackerStep[];
}

export function ProgressTracker({steps}: ProgressTrackerProps) {
  return <Box display="flex" flexDirection="row" justifyContent="space-between">
    {
      steps.map((step, index) => {
        return <Box key={index} display="flex" alignItems="center" justifyContent="center" borderRadius="50%" width="2.5em" height="2.5em">{step.display}</Box>
      })
    }
  </Box>;
}
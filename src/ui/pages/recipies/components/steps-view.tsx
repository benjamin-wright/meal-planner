import { TextField } from "@mui/material";
import { OutlinedContainer } from "../../../components/outlined-container";
import { NewItemButton } from "../../../components/new-item-button";

interface StepsViewProps {
  steps: string[];
  onChange: (steps: string[]) => void;
}

export function StepsView({ steps, onChange }: StepsViewProps) {
  return <OutlinedContainer label="steps">
    {steps.map((step, index) =>
      <TextField
        size="small"
        value={step}
        multiline
        onChange={(e) => {
          const newSteps = [...steps];
          newSteps[index] = e.target.value;
          onChange(newSteps);
        }}
      />
    )}
    <NewItemButton small onClick={() => {}} />
  </OutlinedContainer>
}
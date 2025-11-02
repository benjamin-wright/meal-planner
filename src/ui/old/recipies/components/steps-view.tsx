import { PointerEvent, useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { OutlinedContainer } from "../../../components/outlined-container";
import { NewItemButton } from "../../../components/new-item-button";
import { Reorder, useDragControls } from "motion/react";
import Delete from "@mui/icons-material/Delete";
import DragHandle from "@mui/icons-material/DragHandle";

interface StepsViewProps {
  steps: string[];
  onChange: (steps: string[]) => void;
}

export function StepsView({ steps, onChange }: StepsViewProps) {
  const [stepData, setStepData] = useState<StepData[]>([]);

  useEffect(() => {
    if (stepData.length === steps.length) {
      return;
    }

    const newSteps = steps.map((step, index) => ({
      text: step,
      id: index,
    }));
    setStepData(newSteps);
  }, [ steps ]);

  function handleReorder(newSteps: StepData[]) {
    setStepData(newSteps);
    onChange(newSteps.map((step) => step.text));
  }

  function handleChange(index: number, text: string) {
    const newSteps = [...stepData];
    newSteps[index].text = text;
    setStepData(newSteps);
    onChange(newSteps.map((step) => step.text));
  }

  function handleDelete(index: number) {
    const newSteps = [...stepData];
    newSteps.splice(index, 1);
    setStepData(newSteps);
    onChange(newSteps.map((step) => step.text));
  }

  function handleAdd() {
    const newSteps = [...stepData, { text: "", id: stepData.reduce((max, step) => Math.max(max, step.id), -1) + 1 }];
    setStepData(newSteps);
    onChange(newSteps.map((step) => step.text));
  }

  return <OutlinedContainer label="steps">
    <Reorder.Group axis="y" values={stepData} onReorder={handleReorder}>
      {stepData.map((step: StepData, index: number) => (
        <ReorderItem 
          key={step.id}
          step={step}
          onChange={(text) => handleChange(index, text)}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </Reorder.Group>
    <NewItemButton small onClick={handleAdd} />
  </OutlinedContainer>
}

type StepData = {
  text: string;
  id: number;
}

interface ReorderItemProps {
  step: StepData;
  onChange: (text: string) => void;
  onDelete: () => void;
}

function ReorderItem({ step, onChange, onDelete }: ReorderItemProps) {
  const dragControls = useDragControls();

  function onDragStart(e: PointerEvent) {
    dragControls.start(e);
  }

  return (
    <Reorder.Item key={step.id} value={step} dragListener={false} dragControls={dragControls}>
      <Box display="flex" flexDirection="row" alignItems="center" gap="0.5em">
        <DragHandle onPointerDown={onDragStart} style={{ touchAction: "none" }} sx={{boxSizing: "content-box", padding: "0"}} />
        <TextField sx={{
          flexGrow: 1,
        }} value={step.text} size="small" multiline onChange={(e) => onChange(e.target.value)} />
        <Delete color="error" onClick={onDelete} />
      </Box >
    </Reorder.Item>
  );
}
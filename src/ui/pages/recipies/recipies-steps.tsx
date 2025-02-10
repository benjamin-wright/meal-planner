import { useContext, useEffect, useState, PointerEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form";
import { Recipie } from "../../../models/recipies";
import { DBContext } from "../../providers/database";
import Typography from "@mui/material/Typography";
import { Reorder, useDragControls } from "motion/react";
import { Box, TextField } from "@mui/material";
import DragHandle from "@mui/icons-material/DragHandle";
import { Delete } from "@mui/icons-material";
import { NewItemButton } from "../../components/new-item-button";
import { FormContext, useForms } from "../../providers/forms";

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
        <DragHandle onPointerDown={onDragStart} style={{ touchAction: "none" }} sx={{boxSizing: "content-box", padding: "0.4em 0"}} />
        <TextField sx={{
          flexGrow: 1,
        }} value={step.text} multiline onChange={(e) => onChange(e.target.value)} />
        <Delete color="error" onClick={onDelete} />
      </Box >
    </Reorder.Item>
  );
}

type StepData = {
  text: string;
  id: number;
}

export function RecipiesSteps() {
  const { returnTo, setFormResult } = useForms("recipies");

  const { recipieStore } = useContext(DBContext);
  const params = useParams();

  const [recipie, setRecipie] = useState<Recipie>({ id: 0, name: "", description: "", serves: 1, time: 1, ingredients: [], steps: [] });
  const navigate = useNavigate();

  const [steps, setSteps] = useState<StepData[]>([]);
  const [maxStep, setMaxStep] = useState(0);

  async function load() {
    if (!recipieStore || !params.recipie) {
      return;
    }
    
    const recipie = await recipieStore.get(Number.parseInt(params.recipie, 10));
    setRecipie(recipie);
    setSteps(recipie.steps.map((text, index) => ({ text, id: index })));
    setMaxStep(recipie.steps.length);
  }

  useEffect(() => {
    load();
  }, [recipieStore]);

  function validate() {
    return recipie.name !== "";
  }

  function onReorder(newItems: StepData[]) {
    setSteps(newItems);
  }

  function onNewItem() {
    setSteps([...steps, {text: "thing", id: maxStep}]);
    setMaxStep(maxStep + 1);
  }

  function onChange(index: number, text: string) {
    const newSteps = steps.slice();
    newSteps[index].text = text;
    setSteps(newSteps);
  }

  function onDelete(index: number) {
    const newSteps = steps.slice();
    newSteps.splice(index, 1);
    setSteps(newSteps);
  }

  return (
    <Form
      title={`Recipies: ${recipie.name}`}
      returnTo={`/recipies/${params.recipie}/ingredients`}
      disabled={!validate()}
      onSubmit={async () => {
        recipie.steps = steps.map((step) => step.text);
        await recipieStore?.put(recipie);

        setFormResult("recipies", { field: "recipie", response: recipie.id });
        navigate(returnTo);
      }}
    >
      <Typography variant="h6">Steps</Typography>
      <Reorder.Group axis="y" values={steps} onReorder={onReorder}>
        {steps.map((step: StepData, index: number) => (
          <ReorderItem 
            key={step.id}
            step={step}
            onChange={(text) => onChange(index, text)}
            onDelete={() => onDelete(index)}
          />
        ))}
      </Reorder.Group>
      <NewItemButton onClick={onNewItem} sx={{
        margin: "0 2.2em"
      }} />
    </Form>
  );
}

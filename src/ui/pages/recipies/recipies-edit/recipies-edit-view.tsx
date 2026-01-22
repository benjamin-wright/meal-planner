import { Form } from "../../../components/layout/form/form";
import { Recipe } from "../../../../models/recipies";

type Props = {
  recipe: Recipe;
  isNew: boolean;
  onSubmit: (recipe: Recipe) => void;
}

export function RecipiesEditView({ recipe, isNew, onSubmit }: Props) {
  return <Form title={`Recipe: ${isNew ? "New" : recipe.name}`} onSubmit={() => onSubmit(recipe)}>
    <p></p>
  </Form>;
}

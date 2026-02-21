import { useNavigate, useParams } from "react-router-dom";
import { RecipiesEditView } from "./recipies-edit-view";
import { useRecipe } from "../../../hooks/useRecipe";

export function RecipiesEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const recipieId = params.id ? parseInt(params.id, 10) : null;
  const isNew = params.id === undefined;

  const [recipe, setRecipe, saveRecipe] = useRecipe('recipies-edit-page', recipieId);

  return <RecipiesEditView
    recipe={recipe}
    isNew={isNew}
    onChange={setRecipe}
    onSubmit={async () => {
      await saveRecipe();
      navigate(-1);
    }}
  />;
}

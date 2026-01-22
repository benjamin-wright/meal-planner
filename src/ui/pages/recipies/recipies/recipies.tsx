import { useRecipies } from "../../../hooks/useRecipies";
import { RecipiesView } from "./recipies-view";
import { useNavigate } from "react-router-dom";

export function Recipies() {
  const nagivate = useNavigate();
  const [recipies, deleteRecipie] = useRecipies();

  return <RecipiesView
    recipies={recipies}
    onDelete={deleteRecipie}
    onEdit={(recipe) => nagivate(`/recipies/${recipe.id}`)}
    onNew={() => nagivate('/recipies/new')}
  />;
}

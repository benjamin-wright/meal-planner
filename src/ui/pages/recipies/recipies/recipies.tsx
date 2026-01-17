import { useRecipies } from "../../../hooks/useRecipies";
import { RecipiesView } from "./recipies-view";

export function Recipies() {
  const [recipies] = useRecipies();
  
  return <RecipiesView
    recipies={recipies}
  />;
}

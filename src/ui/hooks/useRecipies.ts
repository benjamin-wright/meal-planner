import { useContext, useEffect, useState } from "react";
import { DBContext } from "../providers/database/db-context";
import { ActionQueue } from "../../utils/action-queue";
import { Recipe } from "../../models/recipies";

const queue = new ActionQueue();

export function useRecipies(): [Recipe[], (recipe: Recipe) => void] {
  const { stores } = useContext(DBContext);
  const [recipies, setRecipies] = useState<Recipe[]>([]);

  useEffect(() => {
    if (!stores) return;

    (async () => {
      const recipies = await stores.recipieStore.getAll();
      setRecipies(recipies);
    })();
  }, [stores]);

  function deleteRecipie(recipe: Recipe) {
    if (!stores) return;

    queue.enqueue(async () => {
      await stores.recipieStore.delete(recipe.id);
    });
    setRecipies(recipies.filter(i => i.id !== recipe.id));
  }

  return [recipies, deleteRecipie];
}

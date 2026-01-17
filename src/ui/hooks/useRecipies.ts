import { useContext, useEffect, useState } from "react";
import { DBContext } from "../providers/database/db-context";
import { ActionQueue } from "../../utils/action-queue";
import { Recipie } from "../../models/recipies";

const queue = new ActionQueue();

export function useRecipies(): [Recipie[], (recipie: Recipie) => void] {
  const { stores } = useContext(DBContext);
  const [recipies, setRecipies] = useState<Recipie[]>([]);

  useEffect(() => {
    if (!stores) return;

    (async () => {
      const recipies = await stores.recipieStore.getAll();
      setRecipies(recipies);
    })();
  }, [stores]);

  function deleteRecipie(recipie: Recipie) {
    if (!stores) return;

    queue.enqueue(async () => {
      await stores.recipieStore.delete(recipie.id);
    });
    setRecipies(recipies.filter(i => i.id !== recipie.id));
  }

  return [recipies, deleteRecipie];
}

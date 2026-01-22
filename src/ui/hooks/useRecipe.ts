import { useContext, useEffect, useState } from "react";
import { Item, ItemKind } from "../../models/items";
import { DBContext } from "../providers/database/db-context";
import { useSavedState } from "./useSavedState";
import { Recipe } from "../../models/recipies";
import { CourseType, DishType } from "../../models/meals";

export function useRecipe(key: string, itemId: number | null): [Recipe, (recipe: Recipe) => void, () => Promise<void>] {
  const { stores } = useContext(DBContext);
  const [recipe, setRecipe] = useSavedState<Recipe>(key, {
    id: 0,
    name: "",
    description: "",
    serves: 0,
    time: 0,
    ingredients: [],
    steps: [],
    course: CourseType.Dinner,
    dish: DishType.Main
  });

  useEffect(() => {
    if (!stores || !itemId) {
      return;
    }

    const fetchItem = async () => {
      const fetchedItem = await stores.itemStore.get(itemId);
      if (fetchedItem) {
        fetchedItem.category = categoryId || fetchedItem.category;
        setItem(fetchedItem);
      }
    };

    fetchItem();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, stores, categoryId]);

  useEffect(() => {
    if (!categoryId || item.category === categoryId) {
      return;
    }

    if (!overrideCategory) {
      return;
    }
    setOverrideCategory(false);

    setItem({
      ...item,
      category: categoryId
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, item.category, overrideCategory]);

  async function save() {
    if (!stores) {
      return;
    }

    if (item.id) {
      const readymeal = item.kind === ItemKind.Readymeal ? item.readymeal : undefined;
      await stores.itemStore.put({ ...item, readymeal });
    } else {
      const readymeal = item.kind === ItemKind.Readymeal ? item.readymeal : undefined;
      await stores.itemStore.add(item.name, item.category, item.kind, readymeal);
    }
  }

  return [item, setItem, save];
}

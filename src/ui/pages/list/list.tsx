import Fab from "@mui/material/Fab";
import { Page } from "../../components/page";
import { Replay } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { DBContext } from "../../providers/database";
import { ShoppingItem } from "../../../models/shopping-item";
import { ConfirmDialog } from "../../components/confirm-dialog";
import { AlertContext } from "../../providers/alerts";
import { ListView } from "./components/list-view";
import { ShoppingViewItem } from "./components/types";

export function List() {
  const { settingStore, ingredientStore, categoryStore, unitStore, recipieStore, mealStore, extraStore, shoppingStore } = useContext(DBContext);
  const { setError, setMessage } = useContext(AlertContext);
  const [ open, setOpen ] = useState(false);
  const [ items, setItems ] = useState<ShoppingViewItem[]>([]);
  const [ categories, setCategories ] = useState<string[]>([]);

  useEffect(() => {
    async function fetchItems() {
      if (!settingStore || !shoppingStore || !categoryStore || !unitStore) {
        return;
      }

      const settings = await settingStore.get();
      const units = await unitStore.getAll();
      const categories = await categoryStore.getAll();

      const weightUnit = units.find((unit) => unit.id === settings.preferredWeightUnit);
      const volumeUnit = units.find((unit) => unit.id === settings.preferredVolumeUnit);
      if (!weightUnit || !volumeUnit) {
        setError("Weight or volume unit not found in settings");
        return;
      }

      const shoppingItems = await shoppingStore.getAll();
      const items = [];
      const usedCategories: string[] = [];

      for (const item of shoppingItems) {
        const unit = units.find((unit) => unit.type === item.unitType);
        const category = categories.find((category) => category.id === item.category);

        if (!unit || !category) {
          setError(`Unit or category not found for item ${item.id}`);
          continue;
        }

        items.push({
          id: item.id,
          name: item.name,
          category: category.name,
          quantity: unit.format(item.quantity, { abbr: true }),
          got: item.got
        });

        if (!usedCategories.includes(category.name)) {
          usedCategories.push(category.name);
        }
      }

      setItems(items);
      setCategories(usedCategories);
    }

    fetchItems();
  }, [ settingStore, shoppingStore, categoryStore, unitStore ]);

  async function reset() {
    if (!ingredientStore || !unitStore || !recipieStore || !mealStore || !extraStore || !shoppingStore) {
      return;
    }
    
    await shoppingStore.clear();

    const meals = await mealStore.getAll();
    const extras = await extraStore.getAll();
    const shoppingMap = new Map<number, ShoppingItem>();

    for (const meal of meals) {
      const recipie = await recipieStore.get(meal.recipieId);
      if (!recipie) {
        setError(`Recipie ${meal.recipieId} not found for meal ${meal.id}`);
        continue;
      }

      for (const recipieIngredient of recipie.ingredients) {
        const ingredient = await ingredientStore.get(recipieIngredient.id);
        if (!ingredient) {
          setError(`Ingredient ${recipieIngredient.id} not found for recipie ${recipie.id}`);
          continue;
        }

        const unit = await unitStore.get(recipieIngredient.unit);
        if (!unit) {
          setError(`Unit ${recipieIngredient.unit} not found for recipie ${recipie.id}`);
          continue;
        }

        let found = false;
        for (const [ recipieId, shoppingItem ] of shoppingMap) {
          if (recipieId === meal.recipieId && shoppingItem.unitType === unit.type) {
            found = true;
            shoppingItem.quantity += recipieIngredient.quantity * meal.servings / recipie.serves;
            break;
          }
        }

        if (found) {
          continue;
        }

        shoppingMap.set(ingredient.id, {
          id: 0,
          name: ingredient.name,
          category: ingredient.category,
          unitType: unit.type,
          quantity: recipieIngredient.quantity * meal.servings,
          got: false
        });
      }
    }

    for (const extra of extras) {
      const ingredient = await ingredientStore.get(extra.ingredient);
      if (!ingredient) {
        setError(`Ingredient ${extra.ingredient} not found for extra ${extra.id}`);
        continue;
      }

      const unit = await unitStore.get(extra.unit);
      if (!unit) {
        setError(`Unit ${extra.unit} not found for extra ${extra.id}`);
        continue;
      }

      let found = false;
      for (const [ recipieId, shoppingItem ] of shoppingMap) {
        if (recipieId === extra.ingredient && shoppingItem.unitType === unit.type) {
          found = true;
          shoppingItem.quantity += extra.quantity;
          break;
        }
      }

      if (found) {
        continue;
      }

      shoppingMap.set(ingredient.id, {
        id: 0,
        name: ingredient.name,
        category: ingredient.category,
        unitType: unit.type,
        quantity: extra.quantity,
        got: false
      });
    }

    const items = Array.from(shoppingMap.values());
    for (const item of items) {
      await shoppingStore.add(item.name, item.category, item.unitType, item.quantity, item.got);
    }
  }

  return <Page title="List" showNav>
    <ListView items={items} categories={categories} onCheck={() => {}} />
    <Fab color="primary" sx={{
      position: "fixed",
      bottom: "2em",
      right: "2em",
    }} onClick={() => setOpen(true)}>
      <Replay />
    </Fab>
    <ConfirmDialog
      open={open}
      message="Resetting shopping list?"
      onConfirm={() => {
        reset().then(() => setMessage("Shopping list reset")).catch((error) => setError(error.message));
        setOpen(false);
      }}
      onCancel={() => setOpen(false)}
    />
  </ Page>;
}

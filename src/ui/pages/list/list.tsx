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
import { Unit, UnitType } from "../../../models/units";

export function List() {
  const { settingStore, ingredientStore, categoryStore, unitStore, recipieStore, mealStore, extraStore, shoppingStore } = useContext(DBContext);
  const { setError, setMessage } = useContext(AlertContext);
  const [ open, setOpen ] = useState(false);
  const [ items, setItems ] = useState<ShoppingViewItem[]>([]);
  const [ categories, setCategories ] = useState<string[]>([]);

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
    const usedCategories: Record<string, boolean> = {};

    for (const item of shoppingItems) {
      let unit: Unit;

      switch (item.unitType) {
        case UnitType.Weight:
          unit = weightUnit;
          break;
        case UnitType.Volume:
          unit = volumeUnit;
          break;
        case UnitType.Count:
          const countUnit = units.find(unit => unit.id === item.unit)
          if (!countUnit) {
            setError(`Failed to find count unit for ${item.name} (${item.id})`);
            continue;
          }

          unit = countUnit;
          break;
      }
      const category = categories.find((category) => category.id === item.category);

      if (!category) {
        setError(`Category not found for item ${item.id}`);
        continue;
      }

      items.push({
        id: item.id,
        name: item.name,
        category: category.name,
        quantity: unit.format(item.quantity, { abbr: true }),
        got: item.got
      });

      if (!usedCategories[category.name]) {
        usedCategories[category.name] = true;
      }
    }

    setItems(items);
    setCategories(categories.filter(category => usedCategories[category.name]).map(category => category.name));
  }

  useEffect(() => {
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
          unit: unit.type === UnitType.Count ? unit.id : undefined,
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
        unit: unit.type === UnitType.Count ? unit.id : undefined,
        quantity: extra.quantity,
        got: false
      });
    }

    const items = Array.from(shoppingMap.values());
    for (const item of items) {
      await shoppingStore.add(item.name, item.category, item.unitType, item.unit, item.quantity, item.got);
    }

    fetchItems();
  }

  function checkItem(item: ShoppingViewItem) {
    if (!shoppingStore) {
      return
    }

    const updatedItems = [...items];
    const index = updatedItems.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      updatedItems[index] = {...item, got: !item.got};
    }
    setItems(updatedItems);

    shoppingStore.check(item.id, !item.got);
  } 

  return <Page title="List" showNav>
    <ListView items={items} categories={categories} onCheck={checkItem} />
    <Fab color="primary" sx={{
      position: "fixed",
      bottom: "2em",
      left: "2em",
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
